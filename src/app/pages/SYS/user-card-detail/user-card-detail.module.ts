import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserCardDetailPage } from "./user-card-detail.page";

@NgModule({
	imports: [
		UserCardDetailPage,
		RouterModule.forChild([{ path: "", component: UserCardDetailPage }]),
	],
})
export class UserCardDetailPageModule {}
