import {
  Component,
  ChangeDetectorRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, WEB_ContentProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';

declare var Quill: any;

@Component({
  selector: 'app-help-detail',
  templateUrl: './help-detail.page.html',
  styleUrls: ['./help-detail.page.scss'],
})
export class HelpDetailPage extends PageBase {
  _helpCode;
  @Input() set helpCode(value: string) {
    this._helpCode = value;
    if (this.formLoaded) {
      this.refresh();
    }
  }

  formLoaded = false;
  isShowAdd = false;
  isShowEdit = false;
  showEditorContent = false;
  quillEditorRef: any;
  content = '';

  @ViewChildren('quillEditor') quillEditor: QueryList<ElementRef>;

  constructor(
    public pageProvider: WEB_ContentProvider,
    public branchProvider: BRA_BranchProvider,
    public env: EnvService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public commonService: CommonService,
    public dynamicScriptLoaderService: DynamicScriptLoaderService,
  ) {
    super();
    this.pageConfig.showSpinner = false;
    this.pageConfig.pageCode = 'help';
    //this.id = this.route.snapshot?.paramMap?.get('id');
    this.formGroup = formBuilder.group({
      IDBranch: [this.env.selectedBranch],
      IDCategory: [''],
      IDParent: [''],
      Id: new FormControl({ value: '', disabled: true }),
      Code: new FormControl({ value: '', disabled: true }),
      Name: ['', Validators.required],
      Remark: [''],
      Sort: [''],
      IsDisabled: new FormControl({ value: '', disabled: true }),
      IsDeleted: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
      Type: [''],
      ThumbnailImage: [''],
      Image: [''],
      AlternateImage: [''],
      PublishDate: [''],
      ViewCount: [''],
      Reviews: [''],
      AllowComment: [''],
      LikeCount: [''],
      Language: [''],
      Summary: [''],
      Content: ['', Validators.required],
      AlterName: [''],
      ReadMoreText: [''],
      SEO1: [''],
      SEO2: [''],
      Approved: [''],
      URL: [''],
      Pin: [''],
      PinPos: [''],
      Home: [''],
      HomePos: [''],
    });
  }

  @Output() closeHelp = new EventEmitter();

  ngAfterViewInit() {
    this.quillEditor.changes.subscribe((elements) => {
      if (typeof elements.first !== 'undefined') {
        this.initQuill();
      }
    });

    // The DOM is fully loaded here
    // You can access DOM elements and run your code
    this.loadQuillEditor();
  }

  loadQuillEditor() {
    if (typeof Quill !== 'undefined') this.initQuill();
    else {
      const script = this.dynamicScriptLoaderService
        .loadScript('https://cdn.quilljs.com/1.3.6/quill.js')
        .then(() => {})
        .catch((error) => console.error('Error loading script', error));

      const style = this.dynamicScriptLoaderService
        .loadStyle('https://cdn.quilljs.com/1.3.6/quill.snow.css')
        .then(() => {})
        .catch((error) => console.error('Error loading style', error));

      Promise.all([script, style])
        .then(() => {
          this.initQuill();
        })
        .catch((error) => console.log(`Error in promises ${error}`));
    }
  }

  quill;
  initQuill() {
    if (this.showEditorContent && this.segmentView == 's1') {
      this.quill = new Quill('#editor', {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'], // remove formatting button
          ],
        },
        theme: 'snow',
        placeholder: 'Typing ...',
      });
      //choose image
      //this.editor.getModule("toolbar").addHandler("image", imageHandler);

      this.quill.on('text-change', (delta, oldDelta, source) => {
        const content = this.quill.root.innerHTML;
        this.item.Content = content;
      });

      const toolbar = document.querySelector('.ql-toolbar');
      toolbar.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
    }
  }

  // imageHandler() {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async function() {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     //const upload = await uploadFile(formData);

  //     const range = this.quill.getSelection();
  //     let link = `https://i.pinimg.com/474x/d3/a5/6e/d3a56e4bf36c6426ed82b68a2221127c.jpg`;

  //     this.quill.insertEmbed(range.index, 'image', link);
  //   }.bind(this);
  // }

  loadData() {
    this.query.Code = this._helpCode;
    this.query.IsDeleted = true;
    this.pageProvider.read(this.query).then((result: any) => {
      if (result.data.length == 0) {
        this.isShowAdd = true;
        this.isShowEdit = false;
        this.formGroup.controls.Id.setValue(0);
      }
      if (result.data.length > 0) {
        this.isShowAdd = false;
        this.isShowEdit = true;
        this.item = result.data[0];
        this.content = this.item.Content;
        this.formGroup?.patchValue(this.item);
        this.formGroup?.markAsPristine();
      }
      this.formGroup.controls.Code.setValue(this._helpCode);
      this.formGroup.controls.Code.markAsDirty();
    });
    super.loadData();
    this.formLoaded = true;
  }

  edit() {
    this.showEditorContent = true;
  }

  preView() {
    this.showEditorContent = false;
  }

  emit(eventName) {
    this[eventName].emit();
  }

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  add() {
    this.item = {
      Id: 0,
    };
    this.showEditorContent = true;
  }

  async saveChange() {
    if (typeof this.item.Content !== 'undefined') {
      this.formGroup.controls.Content.setValue(this.item.Content);
      this.formGroup.controls.Content.markAsDirty();
    }
    super.saveChange2();
  }

  deleted() {
    this.item = null;
    this.id = 0;
    this.content = '';
    this.showEditorContent = false;
  }

  customModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
    imageResize: true,
  };
}
