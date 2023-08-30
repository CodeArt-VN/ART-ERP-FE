
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgOptionHighlightModule } from "@ng-select/ng-option-highlight";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { FileUploadModule } from "ng2-file-upload";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { BranchBreadcrumbsComponent } from "../branch-breadcrumbs/branch-breadcrumbs.component";
import { GroupControlComponent } from "../group-control/group-control.component";
import { FieldControlComponent } from "./field-control.component";
import { FormControlComponent } from "./form-control.component";
import { InputControlComponent } from "./input-control.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		NgxMaskDirective,  NgxMaskPipe,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		FileUploadModule,
	],
	providers: [provideNgxMask()],

	declarations: [
		
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,
	],
	exports: [
		
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,

		NgxMaskDirective,  NgxMaskPipe,
	],
})
export class ShareInputControlsModule { }