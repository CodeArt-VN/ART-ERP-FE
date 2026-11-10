# ART-ERP-FE

Ionic + Angular 20 **NgModule** ERP (Capacitor). Hash router (`useHash: true`). Routes look like `http://localhost:8100/#/...`.

Generic Angular 20 advice does not apply here. Do not convert pages to standalone, signals, `@if` / `@for`, or OnPush unless the file already uses them.

| Agent config | What it covers |
| --- | --- |
| [`.cursor/rules/fe-ngmodule.mdc`](../.cursor/rules/fe-ngmodule.mdc) | Constraints while editing FE files |
| [`.cursor/rules/run-local.mdc`](../.cursor/rules/run-local.mdc) | How to start the app (port 8100, `ionic serve`) |
| [`.cursor/skills/new-fe-crud-page/`](../.cursor/skills/new-fe-crud-page/) | New list/detail page |
| [`.cursor/skills/i18n-keys/`](../.cursor/skills/i18n-keys/) | Translate keys |

Start the app from the workspace [README](../README.md). Do not use `npm start` or `ng serve`.

## Stack

| Piece | This repo |
| --- | --- |
| Angular | 20, NgModules, `standalone: false` |
| UI | Ionic 8 + ionicons |
| Router | `useHash: true` |
| Pages | Extend `PageBase` (`src/app/page-base.ts`) |
| Forms | Reactive `FormGroup` + `app-form-control` |
| List | `app-data-table` |
| i18n | `@ngx-translate`, English keys in `src/assets/i18n/en-US.json` and `vi-VN.json` |
| Tests | Jasmine + Karma, colocated `*.spec.ts` |

## Copy these

- List: [`src/app/pages/_template/flat/`](src/app/pages/_template/flat/)
- Detail: [`src/app/pages/_template/flat-detail/`](src/app/pages/_template/flat-detail/)
- Production sample: [`src/app/pages/WMS/zone/`](src/app/pages/WMS/zone/)
- Tree: [`src/app/pages/_template/tree/`](src/app/pages/_template/tree/)

Do not copy `src/app/pages/VMS/` or `src/app/services/vms/`.

## Do not hand-edit (GenCode)

Building `ART-DMS/GenCode` overwrites:

- `src/app/services/static/services.service.ts`
- `src/app/services/static/api-list.ts`
- `src/app/models/model-list-interface.ts`

Extra non-CRUD paths go on the existing `APIList` key in `global-variable.ts`, or in a new service file.

## Tests

```bash
npx ng test --include=src/app/path/to/file.spec.ts --browsers=ChromeHeadless --watch=false
```
