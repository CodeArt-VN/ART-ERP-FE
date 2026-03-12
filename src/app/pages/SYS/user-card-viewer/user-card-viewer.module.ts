import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserCardViewerPage } from "./user-card-viewer.page";

@NgModule({
	imports: [
		UserCardViewerPage,
		RouterModule.forChild([{ path: "", component: UserCardViewerPage }]),
	],
})
export class UserCardViewerPageModule {}
