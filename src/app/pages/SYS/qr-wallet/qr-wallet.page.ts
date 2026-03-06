import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController, NavController } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PageBase } from "src/app/page-base";
import { ShareModule } from "src/app/share.module";
import QRCode from "qrcode";
import { EnvService } from "src/app/services/core/env.service";
import { HRM_StaffProvider } from "src/app/services/static/services.service";

const USE_MODE_TIMEOUT_SECONDS = 30;

interface QRWalletPayload {
	StaffId: number;
	BusinessPartnerId: number;
	Type: string;
	Timespan: number;
}

interface UseModeCard {
	Code: string;
	Name: string;
	Type: string;
	Payload: QRWalletPayload;
	QrUrl: string;
	TimeoutInSeconds: number;
}

interface QRWalletUI {
	segmentView: string;
	vcardText: string;
	myQrUrl: string;
	useModeCards: UseModeCard[];
}

@Component({
	selector: "app-qr-wallet",
	templateUrl: "qr-wallet.page.html",
	styleUrls: ["qr-wallet.page.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule, IonicModule, TranslateModule, ShareModule],
})
export class QRWalletPage extends PageBase {
	ui: QRWalletUI = {
		segmentView: "s1",
		vcardText: "",
		myQrUrl: "",
		useModeCards: [
			{
				Code: "security-pos",
				Name: "Security Pos",
				Type: "Security Pos",
				Payload: null,
				QrUrl: "",
				TimeoutInSeconds: USE_MODE_TIMEOUT_SECONDS,
			}
		],
	};
	private useModeCountdownInterval: any = null;

	constructor(
		public pageProvider: HRM_StaffProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController
	) {
		super();
		this.pageConfig.isDetailPage = true;
	}

	async segmentChanged(ev: any) {
		const nextSegment = ev.detail.value;
		this.ui.segmentView = nextSegment;

		if (nextSegment == "s2") {
			await this.resetUseModeCardsOnSegmentChange();
			return;
		}

		this.stopUseModeCountdown();
		this.resetAllUseModeCardsState();
	}

	preLoadData(event?: any): void {
		this.stopUseModeCountdown();
		this.id = this.env.user?.StaffID;
		super.preLoadData(event);
	}

	loadedData(event?: any): void {
		if (!this.item) {
			this.ui.vcardText = "";
			this.ui.myQrUrl = "";
			this.stopUseModeCountdown();
			this.ui.useModeCards.forEach((card) => {
				card.Payload = null;
				card.QrUrl = "";
				card.TimeoutInSeconds = USE_MODE_TIMEOUT_SECONDS;
			});
			super.loadedData(event);
			return;
		}

		this.initQRData().finally(() => super.loadedData(event));
	}

	refresh(event = null) {
		this.preLoadData(event);
	}

	async initQRData() {
		await this.buildMyQR();
		await this.buildUseModeQR();
		if (this.ui.segmentView == "s2") {
			this.startUseModeCountdown();
		} else {
			this.stopUseModeCountdown();
			this.resetAllUseModeCardsState();
		}
	}

	async buildMyQR() {
		const staff = this.item || {};
		const branchName = this.env.branchList?.find((d) => d.Id == staff.IDBranch)?.Name ?? "";
		const department = this.env.branchList?.find((d) => d.Id == staff.IDDepartment)?.Name ?? "";
		const jobTitle = this.env.branchList?.find((d) => d.Id == staff.IDJobTitle)?.Name ?? "";
		
		const lines: string[] = [
			"BEGIN:MYCARD",
			"FN:" + (staff.FullName ?? ""),
			"TEL;TYPE=CELL:" + (staff.PhoneNumber ?? ""),
			"EMAIL:" + (staff.Email ?? ""),
			"ID:" + (staff.Id ?? ""),
			"CODE:" + (staff.Code ?? ""),
			"GENDER:" + (staff.Gender ?? ""),
			"DOB:" + (staff.DOB ?? ""),
			"ADDRESS:" + (staff.Address ?? ""),
			"DEPARTMENT:" + department,
			"JOBTITLE:" + jobTitle,
			"ORG:" + branchName,
			"END:MYCARD",
		];

		this.ui.vcardText = lines.join("\n");
		this.ui.myQrUrl = await this.toQrDataUrl(this.ui.vcardText);
	}

	async buildUseModeQR() {
		await Promise.all(this.ui.useModeCards.map((card) => this.buildUseModeCardQR(card)));
	}

	async toQrDataUrl(text: string): Promise<string> {
		if (!text) return "";
		return QRCode.toDataURL(text, {
			errorCorrectionLevel: "M",
			width: 480,
			margin: 1,
			type: "image/webp",
		});
	}

	async buildUseModeCardQR(card: UseModeCard) {
		const user = this.env.user || {};
		const payload: QRWalletPayload = {
			StaffId: user.StaffID,
			BusinessPartnerId: user.IDBusinessPartner,
			Type: card.Type,
			Timespan: Date.now(),
		};

		card.Payload = payload;
		card.QrUrl = await this.toQrDataUrl(JSON.stringify(payload));
	}

	resetAllUseModeCardsState() {
		this.ui.useModeCards.forEach((card) => {
			card.TimeoutInSeconds = USE_MODE_TIMEOUT_SECONDS;
		});
	}

	startUseModeCountdown() {
		this.stopUseModeCountdown();
		if (!this.ui.useModeCards.length) return;

		this.useModeCountdownInterval = setInterval(() => {
			this.ui.useModeCards.forEach((card) => {
				if (card.TimeoutInSeconds > 1) {
					card.TimeoutInSeconds -= 1;
					return;
				}

				card.TimeoutInSeconds = USE_MODE_TIMEOUT_SECONDS;
				this.buildUseModeCardQR(card);
			});
		}, 1000);
	}

	async resetUseModeCardsOnSegmentChange() {
		this.stopUseModeCountdown();
		this.resetAllUseModeCardsState();
		await Promise.all(this.ui.useModeCards.map((card) => this.buildUseModeCardQR(card)));
		this.startUseModeCountdown();
	}

	stopUseModeCountdown() {
		if (!this.useModeCountdownInterval) return;

		clearInterval(this.useModeCountdownInterval);
		this.useModeCountdownInterval = null;
	}

	ngOnDestroy() {
		this.stopUseModeCountdown();
		super.ngOnDestroy();
	}
}
