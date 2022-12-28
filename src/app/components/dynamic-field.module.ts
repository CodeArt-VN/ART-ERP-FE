import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupControlComponent } from './group-control/group-control.component';
import { FieldControlComponent } from './controls/field-control.component';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormControlComponent } from './controls/form-control.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule, 
    NgOptionHighlightModule
  ],
  declarations: [
    GroupControlComponent,
    FieldControlComponent,
    FormControlComponent
  ],
  exports: [GroupControlComponent],
  providers: []
})
export class DynamicFormBuilderModule { }
