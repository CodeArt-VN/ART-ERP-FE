import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserCardPage } from "./user-card.page";

@NgModule({
	imports: [UserCardPage, RouterModule.forChild([{ path: "", component: UserCardPage }])],
})
export class UserCardPageModule {}
