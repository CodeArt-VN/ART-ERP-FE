import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BranchBreadcrumbsComponent } from '../branch-breadcrumbs/branch-breadcrumbs.component';
import { GroupControlComponent } from '../group-control/group-control.component';
import { FieldControlComponent } from './field-control.component';
import { FormControlComponent } from './form-control.component';
import { InputControlComponent } from './input-control.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ShareDirectivesModule } from 'src/app/directives/share-directives.module';
import { InputControlTempateDirective } from './input-control-template.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		NgxMaskDirective,
		NgxMaskPipe,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		ShareDirectivesModule,
		PipesModule,
	],
	providers: [provideNgxMask()],

	declarations: [
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,
		IconPickerComponent,
		ColorPickerComponent,
		InputControlTempateDirective,
	],
	exports: [
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,
		IconPickerComponent,
		ColorPickerComponent,
		InputControlTempateDirective,
		ShareDirectivesModule,

		NgxMaskDirective,
		NgxMaskPipe,
		PipesModule,
	],
})
export class ShareInputControlsModule {}
