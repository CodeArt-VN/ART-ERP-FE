import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ColumnChangesService, DataTableColumnDirective } from './directives/data-table-column-directive';
import { TableColumn } from './interfaces/table-column.interface';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { lib } from 'src/app/services/static/global-functions';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
declare var Fuse: any;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  _allColumns: TableColumn[];
  _inputColumns: TableColumn[];
  _columnTemplates: QueryList<DataTableColumnDirective>;
  _subscriptions: Subscription[] = [];

  _selectedRows: any[] = [];

  @Input() set selectedRows(val: any[]) {
    this._selectedRows = val;
  }

  get selectedRows(): any[] {
    return this._selectedRows;
  }

  @Output() selectedRowsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  onSelectedRowsChange(event) {
    this.selectedRowsChange.emit(this.selectedRows);
    this.activate.emit(event);
  }

  @Input() set columns(val: TableColumn[]) {
    if (val) {
      this._allColumns = [...val];
    }
    this._inputColumns = val;
    this.createFilterFormGroup();
  }

  _query: any = {};
  @Input() set query(val: any) {
    this._query = val;
    if (this.formGroup){
      this.formGroup.patchValue(this._query);
      this.onFilterSubmit(null);
    }
  }
  filterValue: any;

  @Output() filterInputChange: EventEmitter<any> = new EventEmitter();
  onFilterInputChange(e) {
    this.filterValue = this.formGroup.getRawValue();
    this.filterInputChange.emit({ event: e, query: this.filterValue });
  }

  _rowsBeforeFilter: any[];
  @Output() filter: EventEmitter<any> = new EventEmitter();
  onFilterSubmit(e) {
    this.filterValue = this.formGroup.getRawValue();
    if (this.isQueryLocalOnly) {
      this._rowsBeforeFilter = this._rowsBeforeFilter || this._rows;
      const filter = this.filterValue;
      const keysAndTerms = Object.keys(filter).map((key) => ({
        key,
        term: filter[key],
      }));
      const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        useExtendedSearch: false,
        threshold: 0.5,
        shouldSort: true,
        keys: keysAndTerms.map((item) => item.key),
      };
      const terms = keysAndTerms.filter((item) => item.term);
      const searchQuery = {
        $and: terms.map((item) => {
          return { [item.key]: item.term };
        }),
      };
      const fuse = new Fuse(this._rowsBeforeFilter, fuseOptions);
      this._rows = fuse.search(searchQuery).map((result) => result.item);
    } else {
      this.filter.emit({ event: e, query: this.filterValue });
    }
  }

  formGroup: FormGroup;
  createFilterFormGroup() {
    const group: any = {};
    this._allColumns.forEach((column) => {
      if (column.canFilter && column.property) {
        group[column.property] = new FormControl(this._query[column.property] || '');
      }
    });
    this.formGroup = new FormGroup(group);
  }

  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  @ContentChildren(DataTableColumnDirective)
  set columnTemplates(val: QueryList<DataTableColumnDirective>) {
    this._columnTemplates = val;
    this._allColumns = this.translateTemplates(val.toArray());
    this.createFilterFormGroup();
  }

  get columnTemplates(): QueryList<DataTableColumnDirective> {
    return this._columnTemplates;
  }

  _rows: any[];
  /**
   * Rows that are displayed in the table.
   */
  @Input() set rows(val: any) {
    this._rows = val;
    if (this._isTreeList && this.isQueryLocalOnly) {
      this.onSort([]);
    }
  }

  /**
   * Gets the data.
   */
  get rows(): any {
    this.showInfinitespinner = false;
    return this._rows;
  }

  _isTreeList: boolean;
  @Input() set isTreeList(val: boolean) {
    this._isTreeList = val;
    if (this._isTreeList && this.isQueryLocalOnly && this._rows.length) {
      this.onSort([]);
    }
  }

  @Input() trackBy: string;

  @Input() showSpinner: boolean;
  @Input() showFilter: boolean;
  @Input() isQueryLocalOnly: boolean;

  @Output() activate: EventEmitter<any> = new EventEmitter();

  @Output() dataInfinite: EventEmitter<any> = new EventEmitter();

  constructor(
    private columnChangesService: ColumnChangesService,
    private dynamicScriptLoaderService: DynamicScriptLoaderService,
  ) {}

  ngOnInit() {
    this.loadFuse();
  }

  ngAfterContentInit() {
    this.columnTemplates.changes.subscribe((v) => this.translateColumns(v));
    this.listenForColumnInputChanges();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  showInfinitespinner = false;
  onDataInfinite(event) {
    this.showInfinitespinner = true;
    this.dataInfinite.emit(event);
  }

  translateColumns(val: any) {
    if (val) {
      const arr = val.toArray();
      if (arr.length) {
        this._allColumns = this.translateTemplates(arr);
      }
    }
  }

  translateTemplates(templates: DataTableColumnDirective[]): any[] {
    const result: any[] = [];
    for (const temp of templates) {
      const col: any = {};
      const props = Object.getOwnPropertyNames(temp);
      for (const prop of props) {
        col[prop] = temp[prop];
      }

      if (temp.headerTemplate) {
        col.headerTemplate = temp.headerTemplate;
      }

      if (temp.filterTemplate) {
        col.filterTemplate = temp.filterTemplate;
      }

      if (temp.cellTemplate) {
        col.cellTemplate = temp.cellTemplate;
      }

      result.push(col);
    }

    return result;
  }

  private listenForColumnInputChanges(): void {
    this._subscriptions.push(
      this.columnChangesService.columnInputChanges$.subscribe(() => {
        if (this.columnTemplates) {
          this.columnTemplates.notifyOnChanges();
        }
      }),
    );
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  onSort(event) {
    if (this.isQueryLocalOnly) {
      if (this._isTreeList) {
        this._rows.forEach((row) => {row.Sort = null});
        if (event.length) {
        } else {
          event = [{ Dimension: 'levelSort', Order: 'ASC' }];
        }
      }

      this._rows.sort((a, b) => {
        for (const e of event) {
          const comparison = e.Order === 'ASC' ? 1 : -1;
          if (a[e.Dimension] > b[e.Dimension]) return comparison;
          if (a[e.Dimension] < b[e.Dimension]) return -comparison;
        }
        return 0;
      });

      if (this._isTreeList) {
        lib.buildFlatTree(this._rows,[]).then((resp: any) => {
          this._rows = [...resp];
        });
      }

    } else {
      this.sort.emit(event);
    }
  }
  loadFuse() {
    const script = this.dynamicScriptLoaderService
      .loadScript('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js')
      .then(() => {})
      .catch((error) => console.error('Error loading script', error));
    Promise.all([script])
      .then(() => {})
      .catch((error) => console.log(`Error in promises ${error}`));
  }

}
