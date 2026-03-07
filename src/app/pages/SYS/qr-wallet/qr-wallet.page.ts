import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActionSheetController, AlertController, IonicModule, ModalController, NavController } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PageBase } from "src/app/page-base";
import { ShareModule } from "src/app/share.module";
import QRCode from "qrcode";
import { EnvService } from "src/app/services/core/env.service";
import { HRM_StaffProvider } from "src/app/services/static/services.service";

const USE_MODE_TIMEOUT_SECONDS = 30;
type QRFilterMode = "ALL" | "Voucher" | "Other";

interface QRWalletPayload {
	StaffId: number;
	BusinessPartnerId: number;
	Type: string;
	VoucherCode?: string;
	Timespan: number;
}

interface QRItem {
	Code: string;
	Title: string;
	Type: string;
	Remark: string;
	Icon: string;
	PinToEnd?: boolean;
	VoucherCode?: string;
	CanUse?: boolean;
	Payload: QRWalletPayload | null;
	QrContent: string;
	QrUrl: string;
	TimeoutInSeconds: number;
}

interface QRWalletUI {
	filterMode: QRFilterMode;
	qrItems: QRItem[];
	selectedQrItem: QRItem | null;
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
		filterMode: "ALL",
		selectedQrItem: null,
		qrItems: [
			{
				Code: "security-pos",
				Title: "Security Pos",
				Type: "security-pos",
				Remark: "Use for POS payment",
				Icon: "shield-checkmark-outline",
				Payload: null,
				QrContent: "",
				QrUrl: "",
				TimeoutInSeconds: USE_MODE_TIMEOUT_SECONDS,
			},
			{
				Code: "my-qr",
				Title: "My QR",
				Type: "my-qr",
				Remark: "",
				Icon: "person-circle-outline",
				PinToEnd: true,
				Payload: null,
				QrContent: "",
				QrUrl: "",
				TimeoutInSeconds: 0,
			},
		],
	};
	filteredQrItems: QRItem[] = [];
	myCardProfile = {
		fullName: "",
		jobTitle: "",
	};
	private useModeCountdownInterval: any = null;

	constructor(
		public pageProvider: HRM_StaffProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController,
		public actionSheetCtrl: ActionSheetController,
		public qrAlertCtrl: AlertController
	) {
		super();
		this.pageConfig.isDetailPage = true;
	}

	preLoadData(event?: any): void {
		this.stopUseModeCountdown();
		this.id = this.env.user?.StaffID;
		this.applyFilter();
		super.preLoadData(event);
	}

	loadedData(event?: any): void {
		const staff = this.item || this.env.user || {};
		const fullName = String(staff?.FullName || "").trim();
		const jobTitle = String(this.env.branchList?.find((d) => d.Id === staff?.IDJobTitle)?.Name || "").trim();

		this.myCardProfile = {
			fullName,
			jobTitle,
		};

		if (!this.item) {
			this.ui.selectedQrItem = null;
			this.stopUseModeCountdown();
			this.ui.qrItems.forEach((item) => {
				item.Payload = null;
				item.QrContent = "";
				item.QrUrl = "";
				item.TimeoutInSeconds = item.Type === "my-qr" ? 0 : USE_MODE_TIMEOUT_SECONDS;
			});
			this.applyFilter();
			super.loadedData(event);
			return;
		}

		this.initQRData().finally(() => {
			super.loadedData(event);
		});
	}

	refresh(event = null) {
		this.preLoadData(event);
	}

	setFilterMode(mode: QRFilterMode) {
		this.ui.filterMode = mode;
		this.applyFilter();
	}

	async openQrDetail(item: QRItem) {
		if (item.Type !== "my-qr") {
			item.TimeoutInSeconds = USE_MODE_TIMEOUT_SECONDS;
			await this.buildQrForItem(item);
		}

		this.ui.selectedQrItem = item;
	}

	closeQrDetail() {
		this.ui.selectedQrItem = null;
	}

	async openDetailActions(item: QRItem, event?: Event) {
		event?.stopPropagation();
		event?.preventDefault();
		if (item.Type === "voucher") return;

		const actionSheet = await this.actionSheetCtrl.create({
			header: "Actions",
			buttons: [
				{
					text: "Edit",
					icon: "create-outline",
					handler: () => {
						this.openEditQrContent(item);
					},
				},
				{
					text: "Delete",
					icon: "trash-outline",
					role: "destructive",
					handler: () => this.deleteQrItem(item),
				},
				{
					text: "Cancel",
					icon: "close-outline",
					role: "cancel",
				},
			],
		});

		await actionSheet.present();
	}

	async openEditQrContent(item: QRItem) {
		const alert = await this.qrAlertCtrl.create({
			header: "Edit QR Content",
			cssClass: "qr-edit-content-alert",
			inputs: [
				{
					name: "qrContent",
					type: "textarea",
					placeholder: "Enter content",
					value: item.QrContent || "",
					attributes: {
						rows: 8,
					},
				},
			],
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Save",
					handler: async (data) => {
						const nextContent = String(data?.qrContent ?? "");
						await this.applyEditedQrContent(item, nextContent);
					},
				},
			],
		});

		await alert.present();
	}

	async applyEditedQrContent(item: QRItem, nextContent: string) {
		item.QrContent = nextContent;
		item.QrUrl = nextContent ? await this.toQrDataUrl(nextContent) : "";
		this.env.showMessage("Updated QR content", "success");
	}

	async shareQrItem(item: QRItem, event?: Event) {
		event?.stopPropagation();
		event?.preventDefault();

		try {
			const nav = navigator as Navigator & {
				share?: (data: ShareData) => Promise<void>;
				canShare?: (data: ShareData) => boolean;
			};
			const shareText = item.QrContent;

			if (!nav.share) {
				await navigator.clipboard?.writeText(shareText);
				this.env.showMessage("QR content copied", "success");
				return;
			}

			if (item.QrUrl) {
				const file = await this.dataUrlToFile(item.QrUrl, `${item.Code || "qr"}.webp`);
				const fileShareData: ShareData = {
					title: item.Title,
					text: shareText,
					files: [file],
				};

				if (!nav.canShare || nav.canShare(fileShareData)) {
					await nav.share(fileShareData);
					return;
				}
			}

			await nav.share({
				title: item.Title,
				text: shareText,
			});
		} catch {
			this.env.showMessage("Cannot share this QR right now", "danger");
		}
	}

	async saveQrItem(item: QRItem, event?: Event) {
		event?.stopPropagation();
		event?.preventDefault();

		if (!item.QrUrl) {
			this.env.showMessage("QR is not ready", "warning");
			return;
		}

		const link = document.createElement("a");
		link.href = item.QrUrl;
		link.download = `${item.Code || "qr"}-${Date.now()}.webp`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		
		this.env.showMessage("Saved QR image", "success");
	}

	async copyDetailValue(value: string, event?: Event) {
		event?.stopPropagation();
		event?.preventDefault();

		const text = (value || "").trim();
		if (!text) {
			this.env.showMessage("No content to copy", "warning");
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			this.env.showMessage("Copied", "success");
		} catch {
			const copied = this.copyWithTextAreaFallback(text);
			this.env.showMessage(copied ? "Copied" : "Cannot copy this content", copied ? "success" : "danger");
		}
	}

	async initQRData() {
		await this.buildListQRCodes();
		this.startUseModeCountdown();
	}

	buildMyCardContent() {
		const staff = this.item || {};
		const branchName = this.env.branchList?.find((d) => d.Id === staff.IDBranch)?.Name ?? "";
		const department = this.env.branchList?.find((d) => d.Id === staff.IDDepartment)?.Name ?? "";
		const staffJobTitle = this.env.branchList?.find((d) => d.Id === staff.IDJobTitle)?.Name ?? "";
		const jobTitle = this.myCardProfile.jobTitle || staffJobTitle;
		const fullName = this.myCardProfile.fullName || (staff.FullName ?? "");

		const lines: string[] = [
			"BEGIN:MYCARD",
			"FN:" + fullName,
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

		return lines.join("\n");
	}

	async buildListQRCodes() {
		await Promise.all(this.ui.qrItems.map((item) => this.buildQrForItem(item)));
		this.applyFilter();
	}

	async buildQrForItem(item: QRItem) {
		if (item.Type === "my-qr") {
			const myCardContent = this.buildMyCardContent();
			item.Payload = null;
			item.QrContent = "";
			item.QrUrl = await this.toQrDataUrl(myCardContent);
			item.TimeoutInSeconds = 0;
			return;
		}

		const user = this.env.user || {};
		const payload: QRWalletPayload = {
			StaffId: Number(user.StaffID || 0),
			BusinessPartnerId: Number(user.IDBusinessPartner || 0),
			Type: item.Type,
			...(item.VoucherCode ? { VoucherCode: item.VoucherCode } : {}),
			Timespan: Date.now() + USE_MODE_TIMEOUT_SECONDS * 1000,
		};

		item.Payload = payload;
		item.QrContent =
			item.Type === "voucher"
				? `VoucherCode: ${item.VoucherCode || item.Code}\nProgram: ${item.Title}\nCanUse: ${item.CanUse === false ? "No" : "Yes"}`
				: `Type: ${payload.Type}\nStaffId: ${payload.StaffId}\nBusinessPartnerId: ${payload.BusinessPartnerId}`;
		item.QrUrl = await this.toQrDataUrl(JSON.stringify(payload));
	}

	async toQrDataUrl(text: string): Promise<string> {
		if (!text) return "";
		return QRCode.toDataURL(text, {
			errorCorrectionLevel: "M",
			width: 420,
			margin: 1,
			type: "image/webp",
		});
	}

	startUseModeCountdown() {
		this.stopUseModeCountdown();

		this.useModeCountdownInterval = setInterval(() => {
			this.ui.qrItems.forEach((item) => {
				if (item.Type === "my-qr") return;
				if (item.TimeoutInSeconds > 1) {
					item.TimeoutInSeconds -= 1;
					return;
				}

				item.TimeoutInSeconds = USE_MODE_TIMEOUT_SECONDS;
				this.buildQrForItem(item);
			});
		}, 1000);
	}

	stopUseModeCountdown() {
		if (!this.useModeCountdownInterval) return;

		clearInterval(this.useModeCountdownInterval);
		this.useModeCountdownInterval = null;
	}

	applyFilter() {
		const { filterMode, qrItems } = this.ui;
		const filtered = qrItems.filter((item) => {
			if (filterMode === "ALL") return true;

			const isVoucher = item.Type === "voucher";
			const isMyQr = item.Type === "my-qr";

			if (filterMode === "Voucher") return isVoucher;
			return !isVoucher && !isMyQr;
		});

		this.filteredQrItems = this.sortItemsForDisplay(filtered);
	}

	copyWithTextAreaFallback(text: string) {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.opacity = "0";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		let copied = false;
		try {
			copied = document.execCommand("copy");
		} catch {
			copied = false;
		}

		textArea.remove();
		return copied;
	}

	sortItemsForDisplay(items: QRItem[]) {
		return items
			.map((item, index) => ({ item, index }))
			.sort((a, b) => {
				const pinnedDiff = Number(a.item.PinToEnd === true) - Number(b.item.PinToEnd === true);
				if (pinnedDiff !== 0) return pinnedDiff;
				return a.index - b.index;
			})
			.map((entry) => entry.item);
	}

	deleteQrItem(item: QRItem) {
		const index = this.ui.qrItems.findIndex((x) => x.Code === item.Code);
		if (index < 0) return;

		this.ui.qrItems.splice(index, 1);
		if (this.ui.selectedQrItem?.Code === item.Code) {
			this.ui.selectedQrItem = null;
		}

		this.applyFilter();
		this.env.showMessage("Deleted", "success");
	}

	async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
		const response = await fetch(dataUrl);
		const blob = await response.blob();
		return new File([blob], fileName, {
			type: blob.type || "image/webp",
		});
	}

	ngOnDestroy() {
		this.stopUseModeCountdown();
		super.ngOnDestroy();
	}
}
