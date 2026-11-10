export function pickDefaultWarehouseId(branches: { Id: number; Type?: string }[], currentId: any): number | '' {
	const warehouses = (branches || []).filter((b) => b.Type === 'Warehouse');
	if (warehouses.some((w) => w.Id == currentId)) {
		return Number(currentId);
	}
	return warehouses.length ? warehouses[0].Id : '';
}

type Connect = (method: string, url: string, query: any) => Promise<any>;

const warehouseCache = new Map<number, Promise<any[]>>();

export function clearWarehouseSelectCache() {
	warehouseCache.clear();
}

/** Loads the warehouses a branch may use. One request is shared by every control. */
export class WarehouseSelectController {
	load(branchId: number, connect: Connect): Promise<any[]> {
		const id = Number(branchId) || 0;
		const cached = warehouseCache.get(id);
		if (cached) {
			return cached;
		}
		const pending = (
			id
				? Promise.resolve(connect('GET', 'WMS/Storer/WarehouseByBranch', { IDBranch: id }))
						.then((result) => (Array.isArray(result) ? result : []))
						.catch(() => [])
				: Promise.resolve([])
		) as Promise<any[]>;
		warehouseCache.set(id, pending);
		return pending;
	}
}
