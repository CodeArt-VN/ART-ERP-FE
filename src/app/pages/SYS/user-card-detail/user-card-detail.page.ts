import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController, NavController, NavParams } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PageBase } from "src/app/page-base";
import { ShareModule } from "src/app/share.module";
import { EnvService } from "src/app/services/core/env.service";
import { CardType } from "../user-card/user-card.model";

export const CARD_TYPE_OPTIONS: { value: CardType; label: string }[] = [
	{ value: "my-profile", label: "My profile" },
	{ value: "profile", label: "Profile" },
	{ value: "member-card", label: "Member card" },
	{ value: "voucher", label: "Voucher" },
];

const CARD_COLORS = [
	{ value: "dark-purple", hex: "#4a4458" },
	{ value: "light-purple", hex: "#7d6b8a" },
	{ value: "success", hex: "var(--ion-color-success)" },
	{ value: "teal", hex: "#5a7a7a" },
	{ value: "primary", hex: "var(--ion-color-primary)" },
	{ value: "slate", hex: "#3d4f5c" },
	{ value: "dark", hex: "var(--ion-color-dark)" },
	{ value: "medium", hex: "var(--ion-color-medium)" },
	{ value: "warning", hex: "var(--ion-color-warning)" },
	{ value: "tertiary", hex: "var(--ion-color-tertiary)" },
];

@Component({
	selector: "app-user-card-detail",
	templateUrl: "user-card-detail.page.html",
	styleUrls: ["user-card-detail.page.scss"],
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule, ShareModule],
})
export class UserCardDetailPage extends PageBase {
	formGroup: FormGroup;
	cardColors = CARD_COLORS;
	cardTypeOptions = CARD_TYPE_OPTIONS;
	avatarUrl = "assets/imgs/avartar-empty.jpg";

	constructor(
		public env: EnvService,
		public navCtrl: NavController,
		public modalController: ModalController,
		public route: ActivatedRoute,
		public navParams: NavParams,
		public formBuilder: FormBuilder
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.formGroup = formBuilder.group({
			Id: new FormControl({ value: "", disabled: true }),
			CardType: ["", Validators.required],
			Title: [""],
			ImageUrl: [""],
			AvatarUrl: [""],
			Description: [""],
			Color: ["primary"],
		});
	}

	preLoadData(event?: any): void {
		const id = this.navParams?.data?.id ?? this.route?.snapshot?.paramMap?.get("id");
		const item = this.navParams?.data?.item ?? null;

		this.id = id === "0" || id === 0 ? 0 : id;

		if (item) {
			this.item = item;
			this.formGroup.patchValue({
				CardType: item.type ?? "",
				Title: item.title,
				ImageUrl: item.imageUrl ?? item.qrUrl ?? "",
				AvatarUrl: item.avatarUrl ?? "",
				Description: "",
				Color: item.color ?? "primary",
			});
			this.avatarUrl = item.avatarUrl ?? item.imageUrl ?? "assets/imgs/avartar-empty.jpg";
		} else if (this.id === 0) {
			this.item = {};
		}

		this.pageConfig.showSpinner = false;
		this.loadedData(event);
	}

	loadedData(event?: any): void {
		if (this.item && (this.item as any).avatarUrl) {
			this.avatarUrl = (this.item as any).avatarUrl;
		}
		if (this.item && (this.item as any).imageUrl) {
			this.avatarUrl = (this.item as any).imageUrl;
		}
		super.loadedData(event);
	}

	selectColor(color: string) {
		this.formGroup.patchValue({ Color: color });
		this.formGroup.markAsDirty();
	}

	changeAvatar() {
		this.env.showMessage("Change avatar", "primary");
	}

	addImage() {
		this.env.showMessage("Add image", "primary");
	}

	async saveChange() {
		this.formGroup.updateValueAndValidity();
		if (!this.formGroup.valid) {
			this.env.showMessage("Please recheck information highlighted in red above", "warning");
			return;
		}
		if (this.submitAttempt) return;

		this.submitAttempt = true;
		const formValue = this.formGroup.getRawValue();

		const savedItem = {
			id: this.item?.["id"] ?? `new-${Date.now()}`,
			title: formValue.Title || formValue.CardType,
			type: formValue.CardType || "voucher",
			color: formValue.Color,
			imageUrl: formValue.ImageUrl || formValue.AvatarUrl,
			avatarUrl: formValue.AvatarUrl,
			qrContent: (this.item as any)?.qrContent ?? "",
			subtitle: (this.item as any)?.subtitle ?? "",
			remark: (this.item as any)?.remark ?? "",
			fullName: (this.item as any)?.fullName ?? "",
			email: (this.item as any)?.email ?? "",
		};

		this.env.showMessage("Saving completed!", "success");
		this.formGroup.markAsPristine();
		this.submitAttempt = false;

		if (this.modalController) {
			await this.modalController.dismiss(savedItem);
		} else {
			this.navCtrl.back();
		}
	}

	async closeModal() {
		try {
			if (this.modalController) {
				await this.modalController.dismiss();
			} else {
				this.navCtrl.back();
			}
		} catch {
			this.navCtrl.back();
		}
	}
}
