import { BehaviorSubject } from 'rxjs';
import { CacheManagementService } from '../core/cache-management.service';
import { dogF } from 'src/environments/environment';
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


	/**
	 * Nối trang dữ liệu tiếp theo vào danh sách đang hiển thị.
	 * Khi có bản ghi mới (sort Id desc), đuôi trang trước có thể trùng đầu trang sau —
	 * bỏ các dòng trùng Id ở loadedItems rồi append nextPageItems.
	 */
	appendPaginatedItems(loadedItems: any[], nextPageItems: any[]) {
		if (!nextPageItems?.length) {
			return loadedItems ?? [];
		}
		if (!loadedItems?.length) {
			return [...nextPageItems];
		}

		const overlappingIds = new Set(
			nextPageItems.map((item) => item?.Id).filter((id) => id != null && id !== '')
		);

		const keptLoaded = loadedItems.filter((item) => !overlappingIds.has(item?.Id));

		return [...keptLoaded, ...nextPageItems];
	}



	
}
