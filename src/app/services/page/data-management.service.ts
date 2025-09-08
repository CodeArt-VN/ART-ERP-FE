import { BehaviorSubject } from 'rxjs';
import { CacheManagementService } from '../core/cache-management.service';
import { dog } from 'src/environments/environment';
import { EnvService } from '../core/env.service';

export class PageDataManagementService {
	private env: EnvService;
	private pageProvider: any;
	private pageConfig: any;

	items: any[] = [];

	constructor(env: EnvService, pageProvider: any, pageConfig: any, items: any[] = []) {
		this.env = env;
		this.pageProvider = pageProvider;
		this.pageConfig = pageConfig;
		this.items = items;
	}


	mergeItems(currentSet: any[], newSet: any[]) {
		//Merge currentSet and newSet đảm bảm không có Id bị trùng
		const mergedMap = new Map<string, any>();

		// Add currentSet first
		currentSet.forEach(item => {
			mergedMap.set(item.Id, item);
		});

		// Add newSet, replacing duplicates
		newSet.forEach(item => {
			mergedMap.set(item.Id, item);
		});

		return Array.from(mergedMap.values());
	}



	
}
