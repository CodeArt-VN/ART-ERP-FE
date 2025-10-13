import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MonacoEditorLoaderService } from 'src/app/services/custom/custom.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-formula-expand-modal',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>Edit formula</ion-title>
      <ion-buttons slot="end">
        <ion-button (click)="dismiss()">  <ion-icon slot="icon-only" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="monaco-expand" style="height: calc(100vh - 60px); border: 1px solid var(--ion-color-medium)"></div>
  </ion-content>
  <ion-footer>
			<ion-toolbar>
				<ion-button color="warning" size="default" slot="end" (click)="save()"> {{ 'Save' | translate }} </ion-button>
			</ion-toolbar>
		</ion-footer>
  `,
  standalone: true,
   imports: [IonicModule, CommonModule, PipesModule, TranslateModule],
})
export class FormulaExpandModalComponent {
  @Input() value: string;
  @Input() dataSource: any[];

  editorInstance: any;
  monaco: any;

  constructor(private modalCtrl: ModalController, private monacoProvider: MonacoEditorLoaderService) { }

  ionViewDidEnter() {
    this.monacoProvider.load().then(() => this.initEditor());
  }

  initEditor() {
    this.monaco = (window as any).monaco;
    const container = document.getElementById('monaco-expand');
    this.editorInstance = this.monaco.editor.create(container, {
      value: this.value || '',
      language: 'sql',
      theme: 'vs',
			fontFamily: 'JetBrains Mono, monospace',
      fontSize: 15,
      automaticLayout: true,
      minimap: { enabled: false },
    });
  }

  save() {
    const value = this.editorInstance?.getValue() || '';
    this.modalCtrl.dismiss(value);
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }
}
