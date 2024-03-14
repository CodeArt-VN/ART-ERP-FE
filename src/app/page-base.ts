import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { lib } from './services/static/global-functions';
import { ApiSetting } from './services/static/api-setting';
import introJs from 'intro.js/intro.js';
import { APIList, GlobalData } from './services/static/global-variable';
import { PopoverPage } from "./pages/SYS/popover/popover.page";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
    template: '',
    providers: [PopoverPage]
})
export abstract class PageBase implements OnInit {
    env;
    route;
    navCtrl;
    alertCtrl;
    popoverCtrl;
    pageProvider;
    modalController;
    loadingController;


    //Detail page
    id: any;
    cdr;
    formGroup: FormGroup;
    submitAttempt = false;

    item = null;
    items: any = [];
    selectedItems: any = [];

    localQuery: any = {};

    query: any = {
        Keyword: '',
        Take: 100,
        Skip: 0,
    }

    pageConfig: any = {
        pageCode: '',
        pageName: '',
        pageTitle: '',
        pageRemark: '',
        pageIcon: 'star',
        pageColor: 'primary',

        isDetailPage: false,
        isShowMore: false,
        isShowSearch: false,
        isShowCheck: false,
        isShowFeature: false,
        infiniteScroll: true,
        forceLoadData: true,
        refresher: true,
        showSpinner: true,
        isEndOfData: false,
        didEnter: false,
        isMainPageActive:true,

        sort: []

    }

    subscriptions: Subscription[] = [];


    //Data load
    preLoadData(event = null) {
        this.clearData();
        this.loadData();
    }

    clearData() {
        this.pageConfig.showSpinner = true;
        this.pageConfig.isEndOfData = false;
        // this.query.Keyword = '';
        this.items = [];
    }

    loadData(event = null) {
        
        if (this.pageConfig.isDetailPage) {
            this.loadAnItem(event);
        }
        else {
            this.parseSort();
            
            if (this.pageProvider && !this.pageConfig.isEndOfData) {
                if (event == 'search') {
                    this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((result: any) => {
                        if (result.data.length == 0) {
                            this.pageConfig.isEndOfData = true;
                        }
                        this.items = result.data;
                        this.loadedData(null);
                    });
                }
                else {
                    this.query.Skip = this.items.length;
                    this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((result: any) => {
                        if (result.data.length == 0) {
                            this.pageConfig.isEndOfData = true;
                        }
                        if (result.data.length > 0) {
                            let firstRow = result.data[0];

                            //Fix dupplicate rows
                            if (this.items.findIndex(d => d.Id == firstRow.Id) == -1) {
                                this.items = [...this.items, ...result.data];
                            }
                        }

                        this.loadedData(event);
                    }).catch(err => {
                        if (err.message != null) {
                            this.env.showMessage(err.message, 'danger');
                        }
                        else {
                            this.env.showTranslateMessage('Cannot extract data','danger');
                        }

                        this.loadedData(event);
                    });
                }

            }
            else {
                this.loadedData(event);
            }
        }
    }

    DefaultItem = { Id: 0, IsDisabled: false };
    loadedData(event = null, ignoredFromGroup = false) {
        this.pageConfig.showSpinner = false;
        event?.target?.complete();

        if (this.pageConfig.isDetailPage) {
            if (this.item) {
                if (this.item.hasOwnProperty('IsDeleted') && this.item.IsDeleted)
                    this.nav('not-found', 'back')
                this.formGroup?.patchValue(this.item);
                this.formGroup?.markAsPristine();
                this.cdr?.detectChanges();

                if (this.item.IsDisabled)
                    this.pageConfig.canEdit = false;
            }

            if ((!this.item || this.id == 0) && this.pageConfig.canAdd) {
                if (!this.item)
                    this.item = { Id: 0, IsDisabled: false };
                else
                    Object.assign(this.item, this.DefaultItem);

                this.pageConfig.canEdit = this.pageConfig.canAdd;
                // this.formGroup?.reset();
                // this.formGroup?.patchValue(this.item);
            }

            if (!(this.pageConfig.canEdit || (this.pageConfig.canAdd && this.item.Id == 0 || ignoredFromGroup))) {
                this.formGroup?.disable();
            }

        }
    }

    refresh(event = null) {
        this.selectedItems = [];
        if (!this.pageConfig.showSpinner) {
            this.clearData();
            this.env.setStorage('saved-query-' + this.pageConfig.pageName, this.query);
            this.loadData(event);
        }
    }

    search(ev) {
        this.selectedItems = [];
        var val = ev.target.value;
        if (val == undefined) {
            val = '';
        }
        if (val.length > 2 || val == '') {
            this.query.Keyword = val;
            this.query.Skip = 0;
            this.pageConfig.isEndOfData = false;
            this.loadData('search');
        }

    }

    unselect() {
        this.selectedItems.forEach(s => {
            s.checked = false;
        });
        this.selectedItems = [];
    }

    lastchecked = null;
    changeSelection(i, e = null) {
        if (e && e.shiftKey) {
            let from = this.items.indexOf(this.lastchecked);
            let to = this.items.indexOf(i);

            let start = Math.min(from, to);
            let end = Math.max(from, to) + 1;

            let itemsToCheck = this.items.slice(start, end);
            for (let j = 0; j < itemsToCheck.length; j++) {
                const it = itemsToCheck[j];


                it.checked = this.lastchecked.checked;
                const index = this.selectedItems.indexOf(it, 0);

                if (this.lastchecked.checked && index == -1) {
                    this.selectedItems.push(it);
                }
                else if (!this.lastchecked.checked && index > -1) {
                    this.selectedItems.splice(index, 1);
                }

            }

        }
        else if (e) {
            if (e.target.checked) {
                this.selectedItems.push(i);
            }
            else {
                const index = this.selectedItems.indexOf(i, 0);
                if (index > -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
        }
        else {
            if (i.checked) {
                this.selectedItems.push(i);
            }
            else {
                const index = this.selectedItems.indexOf(i, 0);
                if (index > -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
        }

        this.selectedItems = [...this.selectedItems];
        this.lastchecked = i;

        //e?.preventDefault();
        e?.stopPropagation();
    }

    deleteItems(publishEventCode = this.pageConfig.pageName) {
        if (this.pageConfig.canDelete) {
            this.env.showPrompt('Bạn chắc muốn xóa ' + this.selectedItems.length + ' đang chọn?', null, 'Xóa ' + this.selectedItems.length + ' dòng').then(_=>{
                this.env.showLoading('Xin vui lòng chờ trong giây lát...', this.pageProvider.delete(this.selectedItems))
                .then(_ => {
                    this.removeSelectedItems();
                    this.env.showTranslateMessage('Deleted!','success');
                    this.env.publishEvent({ Code: publishEventCode });
                }).catch(err => {
                    this.env.showMessage('Không xóa được, xin vui lòng kiểm tra lại.');
                    console.log(err);
                });
            });
        }
    }

    archiveItems() {
        this.pageProvider.disable(this.selectedItems, !this.query.IsDisabled).then(() => {
            if (this.query.IsDisabled == true) {
                this.env.showTranslateMessage('Reopened {{value}} lines!','success', this.selectedItems.length);
            }
            else {
                this.env.showTranslateMessage('Archived {{value}} lines!','success', this.selectedItems.length);
            }
            this.removeSelectedItems();
        });
    }

    removeSelectedItems() {
        this.selectedItems.forEach(i => {
            const index = this.items.indexOf(i, 0);
            if (index > -1) {
                this.items.splice(index, 1);
            }
            this.items = [...this.items];
        });

        this.selectedItems = [];
    }

    print() {
        window.print();
    }

    add() {
        this.nav(this.pageConfig.pageName + '/' + 0)
        //this.nav('/price-list/0');
    }

    async import(event) {
        if (event.target.files.length == 0)
            return;
        this.env.showLoading('Vui lòng chờ import dữ liệu', this.pageProvider.import(event.target.files[0]))
        .then((resp) => {
            this.refresh();
            if (resp.ErrorList && resp.ErrorList.length) {
                let message = '';
                for (let i = 0; i < resp.ErrorList.length && i <= 5; i++)
                    if (i == 5) message += '<br> Còn nữa...';
                    else {
                        const e = resp.ErrorList[i];
                        message += '<br> ' + e.Id + '. Tại dòng ' + e.Line + ': ' + e.Message;
                    }
                this.env.showPrompt('Có ' + resp.ErrorList.length + ' lỗi khi import:' + message, 'Bạn có muốn xem lại các mục bị lỗi?', 'Có lỗi import dữ liệu').then(_=>{
                    this.downloadURLContent(resp.FileUrl);
                }).catch(e => { });
            }
            else {
                this.env.showTranslateMessage('Import completed!','success');
            }
        })
        .catch(err => {
            if (err.statusText == "Conflict") {
                // var contentDispositionHeader = err.headers.get('Content-Disposition');
                // var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
                // this.downloadContent(result.replace(/"/g, ''),err._body);
                this.downloadURLContent(err._body);
            }
        })

        
    }

    async export() {
        if (this.submitAttempt) return;
        this.submitAttempt = true;
        this.env.showLoading('Vui lòng chờ export dữ liệu...', this.pageProvider.export(this.query))
        .then((response: any) => {
            this.downloadURLContent(response);
            this.submitAttempt = false;
        }).catch(err => {
            this.submitAttempt = false;
        });
    }

    download(url) {
        this.downloadURLContent(url);
    }
    private getAPIPathByPageName(pageName) {
        let apiPath = null;
        if (this.pageConfig.pageName == 'page-staff') {
            apiPath = APIList.FILE_Import.NhanSu;
        }
        else if (this.pageConfig.pageName == 'page-booking') {
            apiPath = APIList.ReportAPI.Booking;
        }

        return apiPath;
    }
    private downloadContent(name, data) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        pom.setAttribute('download', name);
        pom.style.display = 'none';
        document.body.appendChild(pom);
        pom.click();
        document.body.removeChild(pom);
    }
    downloadURLContent(url) {
        if(url.indexOf('http') == -1){
            url = environment.appDomain + url;
        }
        var pom = document.createElement('a');
        pom.setAttribute('target', '_blank');
        pom.setAttribute('href', url);
        //pom.setAttribute('target', '_blank');
        pom.style.display = 'none';
        document.body.appendChild(pom);
        pom.click();
        document.body.removeChild(pom);
    }

    loadAnItem(event = null) {
        this.id = typeof (this.id) == 'string' ? parseInt(this.id) : this.id;

        if (this.id) {
            this.pageProvider.getAnItem(this.id, null).then((ite) => {
                this.item = ite;
                this.loadedData(event);
            }).catch((err) => {
                console.log(err);
                
                if(err.status = 404){
                    this.nav('not-found', 'back');
                }
                else{
                    this.item = null;
                    this.loadedData(event);
                }

            });
        }
        else if (this.id == 0) {
            if (!this.item) this.item = {};
            
            Object.assign(this.item, this.DefaultItem);
            this.loadedData(event);
        }
        else{
            this.loadedData(event);
        }
        
    }

    debounceTimeout;
    debounce(fn, delay) {
        if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            fn()
        }, delay);
    }

    saveChange(publishEventCode = this.pageConfig.pageName) {
        return new Promise((resolve, reject) => {
            this.formGroup.updateValueAndValidity();

            if (!this.formGroup.valid) {
                this.env.showTranslateMessage('Please recheck information highlighted in red above','warning');
            }
            else if (this.submitAttempt == false) {
                this.submitAttempt = true;
                //lib.copyPropertiesValue(this.formGroup.value, this.item);
                // this.item = this.formGroup.value;
                // this.item.Id = this.id;
                Object.assign(this.item, this.formGroup.value);
                Object.keys(this.item).forEach(k => {
                    if (this.item[k] === undefined)
                        delete this.item[k];

                });
                if (!this.item.hasOwnProperty('Id')) {
                    this.item.Id = 0;
                }
                if (!this.item.hasOwnProperty('IsDisabled')) {
                    this.item.IsDisabled = false;
                }



                // this.loadingController.create({
                //     cssClass: 'my-custom-class',
                //     message: 'Đang lưu dữ liệu...'
                // }).then(loading => {
                //     loading.present();
                if (!this.item.IDBranch) {
                    this.item.IDBranch = this.env.selectedBranch;
                }
                this.pageProvider.save(this.item, this.pageConfig.isForceCreate).then((savedItem: any) => {
                    if (publishEventCode) {
                        this.env.publishEvent({ Code: publishEventCode });
                        console.log('saveChange', publishEventCode);
                    }

                    if (this.item.Id != savedItem.Id) {
                        this.item.Id = savedItem.Id;
                        this.id = savedItem.Id;
                        this.loadedData();
                        if (window.location.hash.endsWith('/0')) {
                            let newURL = window.location.hash.substring(0, window.location.hash.length - 1) + savedItem.Id;
                            history.pushState({}, null, newURL);
                        }

                    }

                    // if (loading) loading.dismiss();
                    this.env.showTranslateMessage('Import completed!','success');
                    this.formGroup.markAsPristine();
                    this.cdr.detectChanges();
                    resolve(savedItem.Id);
                    this.submitAttempt = false;
                    this.savedChange(savedItem);
                }).catch(err => {
                    // if (loading) loading.dismiss();
                    this.env.showTranslateMessage('Cannot save, please try again','danger');
                    this.cdr.detectChanges();
                    this.submitAttempt = false;
                    reject(err);
                });
                // });
            }
        });
    }

    saveChange2(form = this.formGroup, publishEventCode = this.pageConfig.pageName, provider = this.pageProvider) {
        return new Promise((resolve, reject) => {
            this.formGroup.updateValueAndValidity();
            if (!form.valid) {
                this.env.showTranslateMessage('Please recheck information highlighted in red above','warning');
            }
            else if (this.submitAttempt == false) {
                this.submitAttempt = true;
                let submitItem = this.getDirtyValues(form);

                provider.save(submitItem, this.pageConfig.isForceCreate).then((savedItem: any) => {
                    resolve(savedItem);
                    this.savedChange(savedItem, form);
                    if (publishEventCode)
                        this.env.publishEvent({ Code: publishEventCode });
                }).catch(err => {
                    this.env.showTranslateMessage('Cannot save, please try again','danger');
                    this.cdr.detectChanges();
                    this.submitAttempt = false;
                    reject(err);
                });
            }
        });
    }

    savedChange(savedItem = null, form = this.formGroup) {
        if (savedItem) {
            if (form.controls.Id && savedItem.Id && form.controls.Id.value != savedItem.Id)
                form.controls.Id.setValue(savedItem.Id);

            if (this.pageConfig.isDetailPage && form == this.formGroup && this.id == 0) {
                this.item = savedItem;
                this.id = savedItem.Id;
                if (window.location.hash.endsWith('/0')) {
                    let newURL = window.location.hash.substring(0, window.location.hash.length - 1) + savedItem.Id;
                    history.pushState({}, null, newURL);
                }
            }
        }

        form.markAsPristine();
        this.cdr.detectChanges();
        this.submitAttempt = false;
        this.env.showTranslateMessage('Saving completed!','success');
    }

    alwaysReturnProps = ['Id', 'IDBranch'];
    getDirtyValues(fg) {
        if (!fg.valid)
            return;

        let dirtyValues = {};  // initialize empty object
        Object.keys(fg.controls).forEach((c) => {
            if (c.indexOf('_') != 0) {
                let currentControl = fg.controls[c];
                if (currentControl.dirty || this.alwaysReturnProps.indexOf(c) > -1) {
                    if (currentControl.controls) //check for nested controlGroups

                        dirtyValues[c] = this.getDirtyValues(currentControl);  //recursion for nested controlGroups
                    else
                        dirtyValues[c] = currentControl.value;  //simple control
                }
            }
        });
        return dirtyValues;
    }

    delete(publishEventCode = this.pageConfig.pageName) {
        if (this.pageConfig.canDelete) {
            this.env.showPrompt('Bạn chắc muốn xóa' + (this.item.Name ? ' ' + this.item.Name : '') + '?').then(_=>{
                this.pageProvider.delete(this.item).then(() => {
                    this.env.showTranslateMessage('Deleted!','success');
                    this.env.publishEvent({ Code: publishEventCode });

                    this.deleted();
                    this.closeModal();

                }).catch(err => {
                    //console.log(err);
                })
            }).catch(e => { });
        }
    }

    deleted(){

    }

    submit(){

    }

    approve(){

    }

    disapprove(){

    }

    cancel(){
        
    }

    copy(){

    }
    merge(){

    }
    split(){
        
    }
    async closeModal() {
        try {
            if (!this.modalController) {
                this.goBack();
                return;
            }
            await this.modalController.dismiss();
        } catch (error) {
            this.goBack();
            return;
        }
    }


    //Datatable funcions
    sort: any = {};
    sortToggle(field, stop = false, sort = this.sort, query = this.query) {
        if (!sort[field]) {
            sort[field] = field
        } else if (sort[field] == field) {
            sort[field] = field + '_desc'
        }
        else {
            delete sort[field];
        }

        let sortTerms = sort;

        let s = Object.keys(sortTerms).reduce(function (res, v) {
            return res.concat(sortTerms[v]);
        }, []);

        if (s.length) {
            query.SortBy = '[' + s.join(',') + ']';
        }
        else {
            delete query.SortBy;
        }
        if (!stop) {
            this.refresh();
        }

    }

    //Public methods
    getAttrib(Id, Lst, Attrib = 'Name', defaultValue: any = '...') {
        if (!Lst) {
            return defaultValue;
        }
        var it = Lst.filter(ite => (ite.IsDeleted == undefined || ite.IsDeleted === false) && ite.Id == Id);
        if (it.length) {
            return it[0][Attrib];
        }
        return defaultValue;
    }


    //ION methods
    ionViewWillEnter() {
        //console.log('ionViewWillEnter');
    }

    ionViewDidEnter() {
        this.pageConfig.didEnter = true;
    }

    ionViewWillLeave() {
        // //console.log('ionViewWillLeave');
    }

    ionViewDidLeave() {

    }

    events(e) {

    }

    ngOnInit() {
        let pageUrl = '';
        
        if (this.route && !this.pageConfig.pageCode ) {
            this.pageConfig.pageCode = this.route.snapshot?.routeConfig?.component?.name;
            this.id = this.route.snapshot?.paramMap?.get('id');
            pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
        }
        else if(this.pageConfig.pageCode != 'help'){
            pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
        }
        else {
            pageUrl = this.pageConfig.pageCode + '/';
        }


        if (this.navCtrl && this.env.user && this.env.user.Forms) {

            //console.log('snapshot.url', this.navCtrl.router.routerState.snapshot.url);
            let currentForm = this.env.user.Forms.find(d => pageUrl.startsWith('/'+d.Code + '/') && (d.Type == 0 || d.Type == 1 || d.Type == 2));
            if (currentForm) {
                this.pageConfig.pageName = currentForm.Code;
                this.pageConfig.pageTitle = currentForm.Name;
                this.pageConfig.pageIcon = currentForm.Icon;
                this.pageConfig.pageColor = currentForm.BadgeColor;
                this.pageConfig.pageRemark = currentForm.Remark;
                this.pageConfig.canEditHelpContent = true;
                
                let permissionList = this.env.user.Forms.filter(d => d.IDParent == currentForm.Id);
                if (permissionList.length) {
                    permissionList.forEach(p => {
                        this.pageConfig[p.Code] = true;
                    });
                }
                //console.log(this.pageConfig);
            }
        }

        console.log('subs', this.pageConfig.pageName);
        this.subscriptions.push(
            this.env.getEvents().subscribe((data) => {
                if (data.Code == 'changeBranch') {
                    this.preLoadData(null);
                }
                else if (!this.pageConfig.isDetailPage && data.Code == this.pageConfig.pageName) {
                    this.refresh(null);
                }
                else {
                    this.events(data);
                }
            })
        );

        if (this.env.user?.UserSetting?.IsCacheQuery.Value) {
            this.env.getStorage('saved-query-' + this.pageConfig.pageName).then((result) => {
                if (result) {
                    this.query = result;
                }
                this.preLoadData();
            }).catch((err) => {
                this.preLoadData();
            });
        }
        else {
            this.preLoadData();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    nav(URL, direction = "forward", data = null) {
        event?.preventDefault();
        event?.stopPropagation();

        if (direction == "forward") {
            if (data) {
                this.navCtrl.navigateForward(URL, data);
            }
            else {
                this.navCtrl.navigateForward(URL);
            }
        }
        else if (direction == "back") {
            this.navCtrl.navigateBack(URL);
        }
        else {
            this.navCtrl.navigateRoot(URL);
        }
    }


    goBack() {
        this.navCtrl.back();
    }

    toggleFeature() {
        this.pageConfig.isShowFeature = !this.pageConfig.isShowFeature;
        if(this.pageConfig.isShowFeature) {
            this.pageConfig.isMainPageActive = true;
        }
        else
        {
            this.pageConfig.isMainPageActive = false;
        }
    }

    showMainView(){
        this.pageConfig.isMainPageActive =  true;
    }
    
    backSubPage() {
        this.pageConfig.isMainPageActive =  true;
        this.pageConfig.isShowFeature = true;
    }

    help() {
        let code = 'help' + this.navCtrl.router.routerState.snapshot.url;
        this.env.publishEvent({ Code: 'app:ShowHelp', Value: code});
    }

    async changeBranch(ev: any) {
        if (0 && !this.pageConfig.canChangeBranch) {
            return;
        }
        let popover = await this.popoverCtrl.create({
            component: PopoverPage,
            componentProps: {
                popConfig: {
                    isShowBranchSelect: true,
                    submitButtonLabel: 'Chọn đơn vị'
                },

            },
            event: ev,
            cssClass: 'delivery-review-filter',
            translucent: true
        });
        popover.onDidDismiss().then((result: any) => {
            console.log(result);
            if (result.data) {
                this.pageProvider.changeBranch({
                    Ids: this.selectedItems.map(m => m.Id),
                    IDBranch: result.data.branch.Id
                }).then(_ => {
                    this.env.showTranslateMessage('Unit changed','success');
                    this.refresh();
                })
            }

        });
        return await popover.present();
    }

    //Tree view
    buildFlatTree(items, treeState, isAllRowOpened = true) {
        return lib.buildFlatTree(items, treeState, isAllRowOpened);
    }

    toggleRow(ls, ite, toogle = false) {

        if (ite && ite.showdetail && toogle) {
            //hide
            ite.showdetail = false;
            this.showHideAllNestedFolder(ls, ite.Id, false, ite.showdetail);

        }
        else if (ite && !ite.showdetail && toogle) {
            //show loaded
            ite.showdetail = true;
            this.showHideAllNestedFolder(ls, ite.Id, true, ite.showdetail);
        }
    }

    showHideAllNestedFolder(ls, Id, isShow, showDetail) {
        ls.filter(d => d.IDParent == Id).forEach(i => {
            if (!isShow || showDetail) {
                i.show = isShow;
            }
            this.showHideAllNestedFolder(ls, i.Id, isShow, i.showdetail);
        });
    }

    trackByFn(index, item) {
        return (item && item.Id) ? item.Id : index;
    }
    itemHeightFn(item, index) {
        return 27;
    }

    onKeydown(event) {
        console.log(event);
        if (event.key === "Enter") {
            this.refresh();
        }
    }


    onDatatableFilter(e) {
        Object.assign(this.query, e.query);
        this.refresh();
    }

    parseSort(){
        let sortTerms = this.pageConfig.sort.map(m => m.Dimension + (m.Order == 'DESC' ? '_desc' : ''));
        if (sortTerms.length) {
            this.query.SortBy = '[' + sortTerms.join(',') + ']';    
        }
    }

    onSort(event) {
        this.pageConfig.sort = event;
        this.refresh();
    }

    searchResultIdList = { term: '', ids: [] };
	searchShowAllChildren = (term: string, item: any) => {
		if (this.searchResultIdList.term != term) {
			this.searchResultIdList.term = term;
			this.searchResultIdList.ids = lib.searchTreeReturnId(this.env.branchList, term);
		}
		return this.searchResultIdList.ids.indexOf(item.Id) > -1;
	}

    closePopListToolBar(){
        this.env.publishEvent({ Code: 'app:closePopListToolBar'});
    }

}