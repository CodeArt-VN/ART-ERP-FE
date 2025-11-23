//Form Management Service
import { Injectable } from '@angular/core';
import { EnvService } from '../core/env.service';
import { PageDataManagementService } from './data-management.service';
import { catchError, concat, distinctUntilChanged, mergeMap, of, switchMap, tap } from 'rxjs';
import { Subject, Observable } from 'rxjs';
import { lib } from '../static/global-functions';

export class FormManagementService {
	createSelectDataSource(searchFunction, buildFlatTree = false) {
		// Buffer scan state directly (no async subscription delay)
		var dataSource = {
			searchFunction: searchFunction,
			loading: false,
			input$: new Subject<string>(),
			selected: [],
			items$: null,
			initSearch() {
				this.loading = false;
				this.items$ = concat(
					of(this.selected),
					this.input$.pipe(
						distinctUntilChanged(),
						tap(() => (this.loading = true)),
						switchMap((term) => {
							return this.searchFunction(term).pipe(
								catchError(() => of([])), // empty list on error
								tap(() => (this.loading = false)),
								mergeMap((e: any) => {
									if (buildFlatTree) {
										return lib.buildFlatTree(e, e);
									}

									return new Promise((resolve) => {
										resolve(e);
									});
								})
							);
						})
					)
				);
			},
		};
		return dataSource;
	}
}
