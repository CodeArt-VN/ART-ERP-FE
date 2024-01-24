import { Component, ChangeDetectorRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, WEB_ContentProvider,  } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);


@Component({
    selector: 'app-help-detail',
    templateUrl: './help-detail.page.html',
    styleUrls: ['./help-detail.page.scss'],
})
export class HelpDetailPage extends PageBase {

    _helpCode  ;
    @Input() set helpCode(value: string) {
      this._helpCode = value;
      if(this.formLoaded){
        this.refresh();
        
      }
     
    }

    formLoaded = false;
    isShowAdd = false;
    isShowEdit = false;
    showEditorContent = false;
    quillEditorRef: any;
    content = '';

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
    ) {
        super();
        this.pageConfig.showSpinner = false;
        this.pageConfig.pageCode = 'help';
        //this.id = this.route.snapshot?.paramMap?.get('id');
        this.formGroup = formBuilder.group({
          IDBranch: [''],
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
          HomePos: ['']
      });
    }

    @Output() closeHelp = new EventEmitter();

    customModules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
    
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
    
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
    
        ['clean'],                                         // remove formatting button
    
        ['link', 'image', 'video']                         // link and image, video
      ],
      imageResize: true
    };
   

    loadData(){
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
    
    
    getEditorInstance(editorInstance: any) {
      this.quillEditorRef = editorInstance;
      this.item.Content = this.quillEditorRef.editor.container.innerHTML;
      super.saveChange2();
      
      //const toolbar = this.quillEditorRef.getModule('toolbar');
      //toolbar.addHandler('image', this.imageHandler);
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

    isQuillEmpty(quill) {
      if ((quill.getContents()['ops'] || []).length !== 1) { return false }
      return quill.getText().trim().length === 0
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

    add(){
      this.item = {
        Id: 0
      }
      this.showEditorContent = true;
    }
    async saveChange() {
      super.saveChange2();
    }
    deleted(){
      this.item = null;
      this.id = 0;
      this.content = '';
      this.showEditorContent = false;
    }
}
