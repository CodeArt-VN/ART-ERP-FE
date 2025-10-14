import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MonacoEditorLoaderService } from 'src/app/services/custom/custom.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { lib } from 'src/app/services/static/global-functions';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { NgOptionHighlightDirective } from '@ng-select/ng-option-highlight';
@Component({
  selector: 'app-formula-expand-modal',
  templateUrl: './formula-expand-modal.html',
  styleUrls: ['formula-expand-modal.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PipesModule, TranslateModule, FormsModule,NgOptionHighlightDirective],
})

export class FormulaExpandModalComponent implements OnInit {
  @Input() value: string;
  @Input() dataSource: any[];
  @Input() item: any;
  keyword$ = new Subject<string>();
  editorInstance: any;
  monaco: any;
  dataSourceGrouped: any = [];
  constructor(private modalCtrl: ModalController, private monacoProvider: MonacoEditorLoaderService) { }
  ngOnInit() {
    this.keyword$
      .pipe(debounceTime(300)) // chờ 300ms sau khi người dùng dừng gõ
      .subscribe((value: string) => {
        this.renderGroups(value); // 👈 truyền value vào hàm
      });
  }
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
      wordWrap: 'on',           // ✅ tự động xuống dòng
      // wrappingIndent: 'indent', // ✅ canh lề đẹp khi xuống dòng
      scrollBeyondLastLine: false, // ✅ tránh dư khoảng trắng dưới
    });
    this.renderGroups();
    this.registerSuggestions();
  }
  isAllRowOpened = true;
  toggleRowAll(ls = []) {
    this.isAllRowOpened = !this.isAllRowOpened;
    ls.forEach((i) => {
      i.showdetail = !this.isAllRowOpened;
      this.toggleRow(i, true);
    });
  }

  toggleRow(ite, toogle = false) {
    if (ite && ite.showdetail && toogle) {
      //hide
      ite.showdetail = false;
      this.showHideAllNestedFolder(ite.Id, false, ite.showdetail);
    } else if (ite && !ite.showdetail && toogle) {
      //show loaded
      ite.showdetail = true;
      this.showHideAllNestedFolder(ite.Id, true, ite.showdetail);
    }
  }
  showHideAllNestedFolder(Id, isShow, showDetail) {
    if (Id == null) return;
    this.dataSourceGrouped.filter((d) => d.IDParent == Id).forEach((i) => {
      if (!isShow || showDetail) {
        i.show = isShow;
      }
      this.showHideAllNestedFolder(i.Id, isShow, i.showdetail);
    });
  }

  insertText(i) {
    if (!this.editorInstance) return;
    if (i.level != 3) return;
    const position = this.editorInstance.getPosition(); // Lấy vị trí con trỏ
    this.editorInstance.executeEdits('', [
      {
        range: new this.monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        ),
        text: `[${i.Code}]`,
        forceMoveMarkers: true,
      },
    ]);

    this.editorInstance.focus(); // đưa focus lại editor
  }

  onKeyDown(event: KeyboardEvent) {
    this.isAllRowOpened = false;
    this.keyword$.next((event.target as HTMLInputElement).value);
  }

  async renderGroups(keyword = '', codeList = null) {
    let dataSource = this.dataSource.filter(d => d.Code?.toLowerCase().includes(keyword.trim().toLocaleLowerCase()) || d.Name?.toLowerCase().includes(keyword.trim().toLocaleLowerCase()) || keyword == '');
    if (codeList) dataSource = dataSource.filter(d => codeList.includes(d.Group));
    let dataSourceFlat = [];

    let groups = [...new Set(dataSource.map(d => d.Group))];
    groups.forEach((g: any) => {
      let subGroups = [...new Set(dataSource.filter(d => d.Group == g && d.SubGroup).map(d => d.SubGroup))];
      g = {
        Code: g,
        Name: g,
        disabled: true,
        Id: lib.generateUID(),
        IDParent: null
      };
      dataSourceFlat.push(g);
      subGroups.forEach((sg: any) => {
        sg = {
          Code: sg,
          Name: sg,
          disabled: true,
          Id: lib.generateUID(),
          IDParent: g.Id
        }
        let children = dataSource.filter(d => d.Group == g.Code && d.SubGroup == sg.Code);
        dataSourceFlat.push(sg);
        children.forEach(c => {
          c.IDParent = sg.Id
          dataSourceFlat.push(c);
        });
      });

    });
    lib.buildFlatTree(dataSourceFlat, [], false).then((resp: any) => {
      this.dataSourceGrouped = resp;
      // this.isAllRowOpened = false;
      this.toggleRowAll(this.dataSourceGrouped);
    })
  }
  registerSuggestions(codeList = null) {
    if (!this.dataSource || !this.monaco) return;
    let dataSource = this.dataSource;
    if (codeList) dataSource = this.dataSource.filter(d => codeList.includes(d.Group));
    // Nếu gõ / thì mới trigger suggestion
    if (this.monacoProvider.disposableCompletionItemProvider) {
      this.monacoProvider.disposableCompletionItemProvider.dispose();
    }
    this.monaco.languages.registerCompletionItemProvider('sql', {
      triggerCharacters: ['/'],
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        const match = textUntilPosition.match(/\/(\w*)$/);
        if (!match) return { suggestions: [] };

        const keyword = match[1].toLowerCase();
        const suggestions = Array.from(dataSource)
          .filter((item) => item.Code.toLowerCase().includes(keyword) || item.Name.toLowerCase().includes(keyword))
          .map((item) => {
            const startPosition = {
              lineNumber: position.lineNumber,
              column: position.column - match[0].length, // match[0] includes the slash
            };
            const endPosition = position;

            return {
              label: `/[${item.Code}] - ${item.Name}`,
              kind: this.monaco.languages.CompletionItemKind.Snippet,
              insertText: `[${item.Code}]`,
              detail: item.Name,
              documentation: `Chèn mã: ${item.Code}`,
              range: {
                startLineNumber: startPosition.lineNumber,
                startColumn: startPosition.column,
                endLineNumber: endPosition.lineNumber,
                endColumn: endPosition.column,
              },
            };
          });
        return { suggestions };
      },
    });
  }
  isSubActive = false;
  save() {
    const value = this.editorInstance?.getValue() || '';
    this.modalCtrl.dismiss(value);
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }
}
