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
			}
		],
	};

	constructor(
		public pageProvider: HRM_StaffProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController
	) {
		super();
		this.pageConfig.isDetailPage = true;
	}

	segmentChanged(ev: any) {
		this.ui.segmentView = ev.detail.value;
	}

	preLoadData(event?: any): void {
		this.id = this.env.user?.StaffID;
		super.preLoadData(event);
	}

	loadedData(event?: any): void {
		if (!this.item) {
			this.ui.vcardText = "";
			this.ui.myQrUrl = "";
			this.ui.useModeCards.forEach((card) => {
				card.Payload = null;
				card.QrUrl = "";
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
		const user = this.env.user || {};
		const modeCard = this.ui.useModeCards[0];
		if (!modeCard) return;

		const payload: QRWalletPayload = {
			StaffId: Number(user.StaffID || 0),
			BusinessPartnerId: Number(user.IDBusinessPartner || 0),
			Type: modeCard.Type,
			Timespan: Date.now() + 30000,
		};

		modeCard.Payload = payload;
		modeCard.QrUrl = await this.toQrDataUrl(JSON.stringify(payload));
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
}
