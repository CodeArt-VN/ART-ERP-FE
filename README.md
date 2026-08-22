# ART-ERP-FE — AI coding guide

Ionic + Angular 20 **NgModule** ERP (Capacitor). Hash router (`useHash: true`).

**This file overrides generic Angular 20 advice.** Official standalone / signals / `@if` `@for` / `inject()`-only / OnPush-by-default **do not apply** unless the file you are editing already uses them.

Canonical CRUD sample (copy this, do not invent a new page architecture):

- List: [`src/app/pages/_template/flat/`](src/app/pages/_template/flat/)
- Detail: [`src/app/pages/_template/flat-detail/`](src/app/pages/_template/flat-detail/)
- Wired in [`src/app/app-routing.module.ts`](src/app/app-routing.module.ts) as `#/flat` and `#/flat/:id`

Production pages that follow the same skeleton (generated provider, no duplicate API):

- [`src/app/pages/WMS/zone/`](src/app/pages/WMS/zone/) + [`zone-detail/`](src/app/pages/WMS/zone-detail/) — `WMS_ZoneProvider` from `services.service.ts`
- [`src/app/pages/SYS/schema/`](src/app/pages/SYS/schema/) — `SYS_SchemaProvider`
- [`src/app/pages/SYS/integration-action/`](src/app/pages/SYS/integration-action/) — list + feature pane like the flat template

Tree list sample: [`src/app/pages/_template/tree/`](src/app/pages/_template/tree/).

**Do not copy `src/app/pages/VMS/` or `src/app/services/vms/`.** That module duplicates GenCode providers, invents parallel URLs (`VMS/Nvr` vs `VMS/NvrDevice`), and is not the FE standard.

---

## Must / must not

**Must**

- `standalone: false` on every `@Component` / `@Directive` / `@NgModule` page.
- Extend `PageBase` (`src/app/page-base.ts`). Do not reimplement list/detail CRUD.
- Inject with the **same public property names** `PageBase` uses: `pageProvider`, `env`, `navCtrl`, `route`, `alertCtrl`, `modalController`, `loadingController`, `popoverCtrl`, `cdr`, `formBuilder`.
- Lazy-load each page via `loadChildren` + `XxxPageModule`. Register the route in the module `routing.module.ts` of that domain (`pages/WMS/routing.module.ts`, `pages/SYS/routing.module.ts`, …) **and** spread that array in `app-routing.module.ts`.
- Import `ShareModule` on every page module. Detail modules also import `ReactiveFormsModule`.
- Selector `app-kebab-case`. Class suffix `Page` or `Component`.
- Tabs + `printWidth` 180, `singleQuote`, `semi` — match `.prettierrc`.
- UI strings: `'English key' | translate`. Reuse existing keys. New keys go in both `src/assets/i18n/en-US.json` and `vi-VN.json`.
- After logic/util changes: add/update a colocated `*.spec.ts` (Jasmine + Karma) and run it.
- For a DB table already in EDMX: inject `{Module}_{Resource}Provider` from `services.service.ts` and type rows with the interface in `models/model-list-interface.ts`. Do not write a second provider or `APIList` block for the same table.

**Must not**

- Do not convert pages to standalone, signals, `ChangeDetectionStrategy.OnPush`, native control flow, or `input()` / `output()` **on existing NgModule pages**.
- Do not rewrite `page-base.ts`, `app.module.ts`, `share.module.ts`.
- Do not edit or recreate GenCode output: `api-list.ts`, `services.service.ts`, `models/model-list-interface.ts`. Extra endpoints go in `global-variable.ts` on the existing `APIList` key.
- Do not build a custom `<table>` / raw `ion-list` CRUD when `app-data-table` fits (flat template).
- Do not put inputs in detail HTML without `app-form-control`.
- Do not call `HttpClient` from a page. Go through a provider (`exService` / `providerService`) or `CommonService.connect`.
- Do not name the list provider `cameraProvider` / `xxxService`. `PageBase.loadData` reads **`this.pageProvider`**.
- Do not copy `pages/VMS/` or `services/vms/` as a pattern (duplicate providers, parallel URLs). Copy `_template/flat` or `pages/WMS/zone` instead.

---

## Stack (actual, not Angular docs)

| Piece | This repo |
| --- | --- |
| Angular | 20, **NgModules**, `standalone: false` |
| UI | Ionic 8 + ionicons |
| Router | `RouterModule.forRoot(..., { useHash: true })` → `#/path` |
| State on pages | Class fields on `PageBase` subclasses |
| Forms | Reactive `FormGroup` + `app-form-control` |
| List UI | `app-data-table` + `datatable-column` |
| Chrome | `app-toolbar`, `app-page-title`, `app-page-message` |
| i18n | `@ngx-translate` pipe `translate` |
| Auth | `authGuard` / `AuthGuard` in `src/app/guards/app.guard.ts` |
| Tests | Jasmine + Karma (`*.spec.ts`) |

Shared widgets live in `src/app/components/` and are re-exported by `ShareModule` → `ShareComponentsModule`. Pages almost never declare extra UI components.

---

## New CRUD page — copy recipe

Goal: list `#/{code}` and detail `#/{code}/:id` (`:id` = `0` means create).

1. Copy `_template/flat` → `src/app/pages/{DOMAIN}/{name}/`
2. Copy `_template/flat-detail` → `src/app/pages/{DOMAIN}/{name}-detail/`
3. Rename files, class names, selectors (`app-{name}`, `app-{name}-detail`).
4. Point `pageProvider` at the generated `{Name}Provider` from `services.service.ts` (search the class first). Custom `providerService` only if the live URL is not `{Module}/{Resource}`.
5. Add two routes in `pages/{DOMAIN}/routing.module.ts`:

```ts
{ path: 'my-entity', loadChildren: () => import('./my-entity/my-entity.module').then((m) => m.MyEntityPageModule), canActivate: [authGuard] },
{ path: 'my-entity/:id', loadChildren: () => import('./my-entity-detail/my-entity-detail.module').then((m) => m.MyEntityDetailPageModule), canActivate: [authGuard] },
```

6. Confirm `{DOMAIN}Routes` is spread into `allRoutes` in `app-routing.module.ts`.
7. Strip the sample feature-panel (`groupControl` / `ion-fab`) unless the list really needs a left group filter.
8. ERP admin: `SYS_Form.Code` **must equal** the route path (`my-entity`). Child forms set `canEdit`, `canAdd`, `ShowDelete`, …

`PageBase.add()` already navigates to `pageConfig.pageName + '/0'`.

---

## File layout

```
src/app/
  page-base.ts                 # all list/detail behavior
  share.module.ts              # re-exports ShareComponentsModule
  app-routing.module.ts        # domain route arrays + template routes
  pages/
    _template/flat|flat-detail|tree
    {DOMAIN}/                  # WMS, SYS, HRM, SALE, …
      routing.module.ts
      {name}/{name}.page.ts|html|scss
      {name}/{name}.module.ts
      {name}-detail/…
  components/                  # toolbar, data-table, form-control, …
  services/
    core/                      # EnvService, CommonService, providerService
    static/
      api-list.ts              # GenCode API map (do not hand-edit unless asked)
      services.service.ts      # GenCode exService providers
      global-functions.ts      # lib.*
    {feature}/                 # custom providers, e.g. services/vms/
```

List module (from flat):

```ts
@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, ShareModule, RouterModule.forChild([{ path: '', component: FlatPage }])],
	declarations: [FlatPage],
})
export class FlatPageModule {}
```

Detail module: same plus `ReactiveFormsModule`, `declarations: [FlatDetailPage]`.

---

## PageBase — constructor names and lifecycle

`PageBase` is an abstract `@Component({ template: '', standalone: false })`. Subclass constructor **assigns** the fields PageBase calls.

```ts
constructor(
	public pageProvider: SYS_ActionProvider, // required — CRUD
	public env: EnvService,                  // required
	public navCtrl: NavController,           // required
	public modalController: ModalController,
	public popoverCtrl: PopoverController,
	public alertCtrl: AlertController,
	public loadingController: LoadingController,
	public location: Location,
) {
	super();
}
```

Detail also needs `route`, `formBuilder`, `cdr` (`loadedData` / `savedChange` call `this.cdr.detectChanges()`).

Lifecycle (do not skip `super`):

| Hook | When | Typical override |
| --- | --- | --- |
| `ngOnInit` | Resolves `pageConfig` from `env.user.Forms` vs URL, then `preLoadData()` | Almost never override |
| `preLoadData` | Lookups then `super.preLoadData()` → `loadData()` | Load ng-select sources; set `pageConfig.sort` |
| `loadData` | List: `pageProvider.read(query)`. Detail: `loadAnItem` | Rarely override |
| `loadedData` | Spinner off; detail `formGroup.patchValue(item)` | Map row display fields, then `super.loadedData(event)` |
| `saveChange` | Detail save | `return super.saveChange2()` (dirty fields only) |

List query defaults: `{ Keyword: '', Take: 200, Skip: 0 }`. Sort: `pageConfig.sort = [{ Dimension: 'Id', Order: 'DESC' }]`.

Important `pageConfig` flags:

- List: leave `isDetailPage` false.
- Detail: `this.pageConfig.isDetailPage = true` in constructor.
- Left feature pane: `isShowFeature` + `isFeatureAsMain` (flat template). Omit if unused.
- Toolbar buttons (`ShowAdd`, `ShowDelete`, `canEdit`, …) are filled from SYS_Form children in `ngOnInit`. Do not hardcode permissions.

---

## List page (flat)

HTML skeleton — keep this structure:

```html
<ion-header [translucent]="true">
	<app-toolbar [page]="this"></app-toolbar>
</ion-header>

<ion-content [fullscreen]="true" appScrollbarTheme class="left scrollx" forceOverscroll="false">
	<ion-refresher [disabled]="!pageConfig.refresher" slot="fixed" (ionRefresh)="refresh($event)">
		<ion-refresher-content></ion-refresher-content>
	</ion-refresher>

	<app-page-title class="ion-padding safe-max-width" [pageConfig]="pageConfig"></app-page-title>

	<div class="safe-max-width">
		<app-data-table
			class="box-shadow responsive padding-number-right"
			[rows]="items"
			[trackBy]="'Id'"
			[(selectedRows)]="selectedItems"
			[showSpinner]="pageConfig.showSpinner"
			[showFilter]="pageConfig.isShowSearch"
			[(query)]="query"
			(dataInfinite)="loadData($event)"
			(filter)="onDatatableFilter($event)"
			(sort)="onSort($event)"
			(selectedRowsChange)="showCommandBySelectedRows($event)"
		>
			<datatable-column [checkbox]="true" name=""></datatable-column>
			<datatable-column class="col-id" name="#" property="Id" [navLink]="pageConfig.pageName"></datatable-column>
			<datatable-column class="col-name flex-break" name="Name" property="Name"></datatable-column>
		</app-data-table>
	</div>
	<div class="ion-padding"></div>
</ion-content>
```

Column width classes (theme): `col-id`, `col-code`, `col-name`, `col-date`, `col-number`, `col-status`, `col-icon`, `flex-break`.

Custom cell:

```html
<datatable-column class="col-name flex-break" name="Name" property="Name">
	<ng-template let-i="row" datatable-cell-template>
		<div [routerLink]="['/' + pageConfig.pageName + '/' + i.Id]">
			<a class="bold"><ion-text color="dark">{{ i.Name }}</ion-text></a>
		</div>
	</ng-template>
</datatable-column>
```

Filter: `filterControlType="date" | "ng-select" | …` and `[filterDataSource]="statusList"` (`bindValue` default `Id`, `bindLabel` default `Name`).

**Do not** copy `system-type.page.html` (`<section class="table">`) for new list pages. That is the old tree/modal pattern.

Feature pane (optional): `ion-fab.feature` + `groupControl` + `onGroupChange` as in the flat template. Requires `class="left"` and `[ngClass]="{ withFeature: pageConfig.isShowFeature }"`.

---

## Detail page (flat-detail)

Constructor:

```ts
super();
this.pageConfig.isDetailPage = true;
this.formGroup = formBuilder.group({
	IDBranch: [this.env.selectedBranch],
	Id: new FormControl({ value: '', disabled: true }),
	Code: [''],
	Name: ['', Validators.required],
	Remark: [''],
	Sort: [''],
	IsDisabled: new FormControl({ value: '', disabled: true }),
	IsDeleted: new FormControl({ value: '', disabled: true }),
	CreatedBy: new FormControl({ value: '', disabled: true }),
	CreatedDate: new FormControl({ value: '', disabled: true }),
	ModifiedBy: new FormControl({ value: '', disabled: true }),
	ModifiedDate: new FormControl({ value: '', disabled: true }),
});
```

Save: only dirty controls (+ always `Id`, `IDBranch`):

```ts
async saveChange() {
	super.saveChange2();
}
```

Lookups **before** `super.preLoadData`:

```ts
preLoadData(event?: any): void {
	this.otherProvider.read({ Take: 500 }).then((rs: any) => {
		this.otherList = rs?.data || [];
		super.preLoadData(event);
	}).catch(() => super.preLoadData(event));
}
```

Layout:

- `*ngIf="item && pageConfig.showSpinner==false"` around the form.
- `app-page-title` then `ion-grid fixed` + `form [formGroup]="formGroup"`.
- Rows: `ion-row.hr-group` — left `ion-col` `size-xl="3"` = section title, two `size-xl="4"` = fields.
- Every field: `<app-form-control [field]="{ id, label, type, form: formGroup }" (change)="saveChange()">`.
- Footer audit block (`*ngIf="item.Id"`): Created/Modified + `type: 'branch-breadcrumbs'` + Remark — copy from flat-detail.
- `<app-page-message [itemsLength]="item? 1: 0" [showSpinner]="pageConfig.showSpinner">`.

`app-form-control` `type` (see `src/app/components/controls/controls.interface.ts`):

`text` `number` `textarea` `checkbox` `date` `datetime-local` `ng-select` `ng-select-branch` `ng-select-status` `ng-select-bp` `ng-select-item` `ng-select-staff` `ng-select-async` `span-datetime` `branch-breadcrumbs` `icon-color` `time-frame`

ng-select:

```html
<app-form-control
	[field]="{
		id: 'IDNvr',
		label: 'NVR',
		type: 'ng-select',
		dataSource: nvrList,
		bindLabel: 'Name',
		bindValue: 'Id',
		form: formGroup,
		appendTo: '#my-detail-page'
	}"
	(change)="saveChange()"
></app-form-control>
```

Put `<div id="my-detail-page" style="position: absolute; z-index: 30005"></div>` in the page so dropdowns are not clipped.

Segments (`segmentView` / `ion-segment`) are optional; use when the form has multiple tabs like the template `s1` / `s2`.

---

## Other page shapes (not default)

| Shape | When | Sample |
| --- | --- | --- |
| **Flat list + routed detail** | Default CRUD | `_template/flat` + `flat-detail` |
| **Tree list + routed detail** | `IDParent` hierarchy | `_template/tree` (`buildFlatTree`, `toggleRow`) |
| **List + modal detail** | Small entity, no own URL | `pages/SYS/system-type` + `system-type-detail` (`NavParams`, `closeModal`) |
| **Custom workspace** | Dashboard / POS / report, not table CRUD | still `PageBase` + `ShareModule`; do not invent a second HTTP client |

Do not mix: if the list uses `app-data-table` + `navLink`, the detail must be a routed page, not a modal.

---

## GenCode — already generated, do not duplicate

Source: `ART-DMS/GenCode` T4 templates read `ART-DMS/ClassLibrary/Model.edmx`. Building GenCode **overwrites** these FE files. Pages / routing / HTML are **not** generated.

| Template | Copied to (do not hand-write) |
| --- | --- |
| `api-list.tt` | `src/app/services/static/api-list.ts` → `APIListBase` |
| `Services.tt` | `src/app/services/static/services.service.ts` → `{Name}Provider` |
| `ModelList-Interface.tt` | `src/app/models/model-list-interface.ts` → `export interface {Name}` |

`APIList` in `global-variable.ts` is `APIListBase` plus **manual extras** (approve, custom Account, …). That file is the only place to add non-CRUD paths onto an existing entity.

### Naming (`tbl_*` → FE)

`tbl_{Module}_{Resource}` → name `{Module}_{Resource}`, URL `{Module}/{Resource}` (first `_` after the module prefix becomes `/`).

Examples: `tbl_WMS_Zone` → `WMS_Zone` / `WMS/Zone`; `tbl_SYS_Type` → `SYS_Type` / `SYS/Type`.

Provider: `WMS_ZoneProvider`. Interface: `WMS_Zone` (scalar columns only; no navigation properties).

### What each provider already has

`exService` (`common.service.ts`) + `APIListBase.{Name}` already expose:

| Key | HTTP | Path |
| --- | --- | --- |
| `getList` | GET | `{Module}/{Resource}` |
| `getSearchList` | GET | `…/Search` |
| `getItem` | GET | `…/{id}` |
| `postItem` | POST | `…` |
| `putItem` | PUT | `…/{id}` |
| `delItem` | DELETE | `…/{id}` |
| `disableItem` / `enableItem` | PUT | `…/Disable/{id}` · `…/Enable/{id}` |
| `changeBranch` | POST | `…/ChangeBranch` |
| `getExport` / `postImport` | DOWNLOAD / UPLOAD | `…/Export` · `…/Import` |

Page usage (already on `pageProvider`): `read(query)`, `getAnItem(id)`, `save(item)`, `delete(items)`, `disable(items)`, `import(file)`, `export(query)`.

Default:

```ts
import { WMS_ZoneProvider } from 'src/app/services/static/services.service';
import { WMS_Zone } from 'src/app/models/model-list-interface';
// constructor(public pageProvider: WMS_ZoneProvider, ...)
```

Do **not** add `src/app/services/{module}/*.providers.ts` that re-exports the same `{Name}Provider` class.

### When AI may write API code

| Need | Where |
| --- | --- |
| Standard CRUD for a table already in EDMX | Use generated provider. If the class is missing, **ask to rebuild GenCode** — do not paste a new `APIList` entity. |
| Extra action on the same resource (`Approve`, …) | `APIList.{Name}.approve = { method, url }` in `global-variable.ts` (see `PURCHASE_Quotation.approve`) |
| Cache / local search fields | `search-config.ts` keyed by entity name (`SearchConfig.getSearchFields('WMS_Zone')`). Not generated. |

`EnvService` helpers: `env.showMessage(key, 'success'|'danger'|…)`, `env.actionConfirm(…)`, `env.getStatus('Code')`, `env.getType('Code')`, `env.branchList`, `env.selectedBranch`.

---

## SYS_Form, route, permission

`PageBase.ngOnInit` finds `env.user.Forms` where the current hash URL starts with `'/' + form.Code + '/'`.

- Route `path: 'zone'` ↔ Form `Code = zone`.
- `pageConfig.pageName` = that Code (used in `routerLink` and `add()`).
- Child forms (`IDParent` = this form) copy `Code` onto `pageConfig` (`canEdit`, `canAdd`, `ShowDelete`, `ShowAdd`, …).
- Guard: `canActivate: [authGuard]` (functional) or `[AuthGuard]` (class) — both in `app.guard.ts`. Match the sibling files in that `routing.module.ts`.

Without a matching SYS_Form row the page loads but toolbar title/permissions are empty.

---

## i18n and messages

```html
{{ 'Other information' | translate }}
this.env.showMessage('Saving completed!', 'success');
```

Keys are English sentences already used across the app.

---

## Style and lint

- `.prettierrc`: tabs, width 180, single quotes, semicolons, trailingComma `es5`.
- ESLint: selector prefix `app`, class suffix `Page` \| `Component`, `prefer-standalone` is **off**.
- SCSS colocated with the page. Reuse theme classes (`safe-max-width`, `box-shadow`, `hr-group`, `ion-padding`). Do not add a new CSS framework.
- Templates in this repo use `*ngIf` / `*ngFor` / `[ngClass]`. Follow the file you copied.

---

## Tests

- Jasmine + Karma. Colocate `foo.util.ts` ↔ `foo.util.spec.ts`.
- Pure helpers: extract to `.util.ts` and test that (see `src/app/page-base-list-patch.spec.ts` / component specs under `components/`).
- `PageBase` list-patch: `src/app/page-base-list-patch.spec.ts`.
- Do not add a full Ionic page spec unless the change is in the page class and cannot be extracted.
- Run: `npx ng test --include=src/app/path/to/file.spec.ts --browsers=ChromeHeadless --watch=false`

---

## Checklist before finishing a page task

- [ ] Did not copy `pages/VMS/` or `services/vms/` as a skeleton
- [ ] `standalone: false`, `ShareModule`, property name exactly `pageProvider`
- [ ] `pageProvider` is generated `{Name}Provider` from `services.service.ts` (custom only if URL ≠ GenCode)
- [ ] Route in domain `routing.module.ts`; path = intended SYS_Form.Code
- [ ] List: `app-toolbar` + `app-data-table` + infinite/filter/sort bindings
- [ ] Detail: `isDetailPage`, `formGroup`, `app-form-control`, `saveChange2`, audit row
- [ ] Lookups loaded in `preLoadData` before `super.preLoadData`
- [ ] Translate keys exist or reused
- [ ] Spec for new util/logic; command above run
- [ ] Did not edit `page-base.ts` / `api-list.ts` / `services.service.ts` / `model-list-interface.ts` unless asked to regenerate
