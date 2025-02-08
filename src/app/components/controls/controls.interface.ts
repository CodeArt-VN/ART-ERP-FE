import { FormGroup } from '@angular/forms';

export interface InputControlField {
  form: FormGroup;

  type:
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'datetime-local'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'ng-select'
    | 'ng-select-branch'
    | 'ng-select-status'
    | 'ng-select-bp'
    | 'ng-select-item'
    | 'textarea'
    | 'branch-breadcrumbs'
    | 'span-text'
    | 'span-number'
    | 'span-date'
    | 'span-datetime'
    | 'icon'
    | 'color';

  id: string;
  secondaryId: string;

  label: string;
  color: string;

  placeholder?: string;

  dataSource?: any[] | any;

  bindValue?: string;

  bindLabel?: string;

  multiple?: boolean;

  clearable?: boolean;

  noCheckDirty?: boolean;
  
  appendTo:string;

  treeConfig?: {
    isTree? : boolean;
    isCollapsed? : boolean;
    searchFn? : any;
    searchFnDefault?:boolean;
    rootCollapsed?:boolean;
  }

  branchConfig?:{
    selectedBranch?:number,
    showingType?: string,
    showingDisable?: boolean,
    showingMode: 
    | 'showAll'
    | 'showSelectedAndChildren'
  }
}
