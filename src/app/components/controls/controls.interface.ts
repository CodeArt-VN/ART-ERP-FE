import { FormGroup } from "@angular/forms";

export interface InputControlField {
    
    form: FormGroup;

    type : 'text' | 'number' | 'email' | 'date' | 'start' | 'datetime-local' | 'radio' | 'select' | 'ng-select' | 'ng-select-status' | 'ng-select-bp' | 'ng-select-item' | 'textarea' | 'branch-breadcrumbs' | 'span-number' | 'span-date' | 'span-datetime' ;

    id: string;

    label: string;

    placeholder?: string;

    dataSource?: any[] | any;

    bindValue?: string;

    bindLabel?: string;

    multiple?: boolean;

    clearable?: boolean;

    noCheckDirty?: boolean;
    
}
