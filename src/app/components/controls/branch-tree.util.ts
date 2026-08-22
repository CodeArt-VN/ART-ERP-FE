import { lib } from 'src/app/services/static/global-functions';

export interface BranchTreeNode {
	Id: number;
	IDParent?: number | null;
	Name?: string;
	Code?: string;
	Type?: string;
	Color?: string;
	Icon?: string;
	disabled?: boolean;
	levels?: string[];
	level?: number;
	_searchIndex?: string;
	blockedShow?: boolean;
	hasChildInSearchBox?: boolean;
	show?: boolean;
	showdetail?: boolean;
	[key: string]: any;
}

export interface BranchTreeConfig {
	selectedBranch?: number;
	showingType?: string;
	showingDisable?: boolean;
	showingMode?: string;
	isCollapsed?: boolean;
	rootCollapsed?: boolean;
	selectedValue?: any;
	bindValue?: string;
}

export function buildBranchTreeConfigKey(source: any[] | null | undefined, config: BranchTreeConfig): string {
	return JSON.stringify({
		len: source?.length ?? 0,
		selectedBranch: config.selectedBranch ?? null,
		showingType: config.showingType ?? '',
		showingDisable: config.showingDisable ?? false,
		showingMode: config.showingMode ?? '',
		isCollapsed: config.isCollapsed ?? true,
		rootCollapsed: config.rootCollapsed ?? false,
		selectedValue: config.selectedValue ?? null,
		bindValue: config.bindValue ?? 'Id',
	});
}

/** Isolated branch tree state — never mutates the original dataSource items. */
export class BranchTreeView {
	readonly workingItems: BranchTreeNode[];

	private readonly childrenByParent = new Map<number | null, BranchTreeNode[]>();
	private readonly parentById = new Map<number, BranchTreeNode>();
	private readonly expandedIds = new Set<number>();
	private searchTerm = '';
	private matchIds = new Set<number>();
	private readonly bindValue: string;
	private readonly expandRootsByDefault: boolean;
	private readonly showingType?: string;

	visibleItems: BranchTreeNode[] = [];

	constructor(source: BranchTreeNode[] | null | undefined, config: BranchTreeConfig) {
		this.bindValue = config.bindValue || 'Id';
		this.expandRootsByDefault = config.rootCollapsed !== true;
		this.showingType = config.showingType;
		this.workingItems = this.buildWorkingItems(source || [], config);
		this.buildIndexes();
		this.initExpandedState(config.selectedValue);
		this.refreshVisibleItems();
	}

	toggle(id: number): void {
		const node = this.parentById.get(id);
		if (!node?.hasChildInSearchBox) {
			return;
		}
		if (this.expandedIds.has(id)) {
			this.expandedIds.delete(id);
		} else {
			this.expandedIds.add(id);
		}
		this.refreshVisibleItems();
	}

	search(term: string): void {
		this.searchTerm = (term || '').trim();
		if (!this.searchTerm) {
			this.matchIds.clear();
			this.refreshVisibleItems();
			return;
		}
		this.matchIds = new Set(lib.searchTreeReturnId(this.workingItems, this.searchTerm));
		this.refreshVisibleItems();
	}

	clearSearch(): void {
		this.searchTerm = '';
		this.matchIds.clear();
		this.refreshVisibleItems();
	}

	/** Restore default collapsed tree when the dropdown panel closes. */
	resetPanelState(selectedValue?: any): void {
		this.searchTerm = '';
		this.matchIds.clear();
		this.expandedIds.clear();
		this.initExpandedState(selectedValue);
		this.refreshVisibleItems();
	}

	firstSearchHitId(): number | null {
		if (!this.visibleItems.length) {
			return null;
		}
		if (!this.searchTerm) {
			return this.visibleItems[0].Id;
		}
		const term = lib.URLFormat(this.searchTerm);
		const hit = this.visibleItems.find((i) => (i._searchIndex || '').indexOf(term) > -1);
		return hit?.Id ?? this.visibleItems[0].Id;
	}

	matchesSearch(term: string, item: BranchTreeNode): boolean {
		if (!term) {
			return true;
		}
		if (this.searchTerm !== term) {
			this.search(term);
		}
		return this.matchIds.has(item.Id);
	}

	getLabelItems(value: any, bindValue = this.bindValue, multiple = false): BranchTreeNode[] {
		if (multiple && Array.isArray(value)) {
			return value.map((v) => this.workingItems.find((i) => i[bindValue] == v)).filter(Boolean) as BranchTreeNode[];
		}
		if (value == null || value === '') {
			return [];
		}
		const item = this.workingItems.find((i) => i[bindValue] == value);
		return item ? [item] : [];
	}

	isExpanded(id: number): boolean {
		return this.expandedIds.has(id);
	}

	private buildWorkingItems(source: BranchTreeNode[], config: BranchTreeConfig): BranchTreeNode[] {
		let items = source.map((item) => ({ ...item }));

		let parentList: BranchTreeNode[] = [];
		const selected = config.selectedBranch != null ? items.find((d) => d.Id == config.selectedBranch) : null;
		if (selected) {
			const mode = config.showingMode || '';
			switch (mode) {
				case 'showAll':
					break;
				case 'showSelectedAndChildren':
					items = [selected, ...this.collectNestedChildren(items, config.selectedBranch!)];
					break;
				default:
					parentList = this.collectParentChain(items, selected.IDParent);
					items = [...parentList, selected, ...this.collectNestedChildren(items, config.selectedBranch!)];
					break;
			}
		}

		this.applyShowingType(items, config.showingType);

		if (!config.showingDisable) {
			const parentDisabledList = new Set<number>();
			items
				.filter((d) => !d.disabled)
				.forEach((i) => {
					this.collectParentChain(items, i.IDParent).forEach((p) => parentDisabledList.add(p.Id));
				});
			items.forEach((d) => {
				if (
					d.Id != selected?.Id &&
					!parentList.some((p) => p.Id == d.Id) &&
					d.disabled &&
					!parentDisabledList.has(d.Id)
				) {
					d.blockedShow = true;
				}
			});
		}

		this.ensureLevels(items);
		items.forEach((i) => {
			if (i._searchIndex == null) {
				i._searchIndex = lib.URLFormat(`${i.Code || ''}${i.Name || ''}`);
			}
		});

		return items;
	}

	private applyShowingType(items: BranchTreeNode[], showingType?: string): void {
		if (!showingType) {
			return;
		}
		let draft = showingType;
		const isNegated = draft.startsWith('ne_');
		if (isNegated) {
			draft = draft.substring(draft.indexOf('ne_') + 3);
		}
		const isList = draft.startsWith('[') && draft.endsWith(']');
		const types = isList ? draft.replace(/[\[\]]/g, '').split(',') : [draft];

		items.forEach((d) => {
			const inList = types.includes(d.Type);
			if (isNegated) {
				d.disabled = inList;
			} else if (isList) {
				d.disabled = !inList;
			} else {
				d.disabled = d.Type != draft;
			}
		});
	}

	private buildIndexes(): void {
		this.childrenByParent.clear();
		this.parentById.clear();

		for (const item of this.workingItems) {
			this.parentById.set(item.Id, item);
			const parentId = item.IDParent ?? null;
			if (!this.childrenByParent.has(parentId)) {
				this.childrenByParent.set(parentId, []);
			}
			this.childrenByParent.get(parentId)!.push(item);
		}

		for (const item of this.workingItems) {
			item.hasChildInSearchBox = this.hasEligibleChild(item.Id);
		}
	}

	private initExpandedState(selectedValue?: any): void {
		if (this.expandRootsByDefault) {
			this.expandRoots();
		}
		if (this.showingType) {
			this.expandAncestorsOfSelectable();
		}
		if (selectedValue != null && selectedValue !== '') {
			const selected = this.workingItems.find((i) => i[this.bindValue] == selectedValue);
			if (selected) {
				this.collectParentChain(this.workingItems, selected.IDParent).forEach((p) => this.expandedIds.add(p.Id));
			}
		}
	}

	/** When filtering by Type (e.g. Warehouse), expand every ancestor so leaf nodes are visible. */
	private expandAncestorsOfSelectable(): void {
		for (const item of this.workingItems) {
			if (item.blockedShow || item.disabled) {
				continue;
			}
			this.collectParentChain(this.workingItems, item.IDParent).forEach((p) => this.expandedIds.add(p.Id));
		}
	}

	private expandRoots(): void {
		for (const item of this.workingItems) {
			if (!item.hasChildInSearchBox) {
				continue;
			}
			if (item.IDParent == null || item.IDParent === undefined || !this.parentById.has(item.IDParent)) {
				this.expandedIds.add(item.Id);
			}
		}
	}

	expandPathToSelected(selectedValue?: any): void {
		if (selectedValue == null || selectedValue === '') {
			return;
		}
		const selected = this.workingItems.find((i) => i[this.bindValue] == selectedValue);
		if (!selected) {
			return;
		}
		this.collectParentChain(this.workingItems, selected.IDParent).forEach((p) => this.expandedIds.add(p.Id));
		this.refreshVisibleItems();
	}

	private refreshVisibleItems(): void {
		if (this.searchTerm) {
			this.visibleItems = this.workingItems.filter((i) => !i.blockedShow && this.matchIds.has(i.Id));
		} else {
			this.visibleItems = this.workingItems.filter((i) => !i.blockedShow && this.isTreeVisible(i));
		}
		this.syncLegacyShowFlags();
	}

	private syncLegacyShowFlags(): void {
		for (const item of this.workingItems) {
			if (item.blockedShow) {
				item.show = false;
				item.showdetail = false;
				continue;
			}
			if (this.searchTerm) {
				item.show = this.matchIds.has(item.Id);
			} else {
				item.show = this.isTreeVisible(item);
			}
			item.showdetail = this.expandedIds.has(item.Id);
		}
	}

	private isTreeVisible(item: BranchTreeNode): boolean {
		if (item.blockedShow) {
			return false;
		}
		if (item.IDParent == null || item.IDParent === undefined) {
			return true;
		}
		const parent = this.parentById.get(item.IDParent);
		if (!parent || parent.blockedShow) {
			return false;
		}
		if (!this.isTreeVisible(parent)) {
			return false;
		}
		return this.expandedIds.has(parent.Id);
	}

	private hasEligibleChild(id: number): boolean {
		const children = this.childrenByParent.get(id) || [];
		return children.some((child) => !child.disabled || this.hasEligibleChild(child.Id));
	}

	private collectNestedChildren(items: BranchTreeNode[], id: number, result: BranchTreeNode[] = []): BranchTreeNode[] {
		items.filter((d) => d.IDParent == id).forEach((c) => {
			result.push(c);
			this.collectNestedChildren(items, c.Id, result);
		});
		return result;
	}

	private collectParentChain(items: BranchTreeNode[], id?: number | null, result: BranchTreeNode[] = []): BranchTreeNode[] {
		if (id == null) {
			return result;
		}
		const parent = items.find((d) => d.Id == id);
		if (parent) {
			result.unshift(parent);
			if (parent.IDParent) {
				this.collectParentChain(items, parent.IDParent, result);
			}
		}
		return result;
	}

	private ensureLevels(items: BranchTreeNode[]): void {
		const byId = new Map(items.map((i) => [i.Id, i]));
		const levelsCache = new Map<number, string[]>();

		const resolveLevels = (item: BranchTreeNode): string[] => {
			if (levelsCache.has(item.Id)) {
				return levelsCache.get(item.Id)!;
			}
			if (item.levels?.length) {
				levelsCache.set(item.Id, [...item.levels]);
				return item.levels;
			}
			if (item.IDParent == null || !byId.has(item.IDParent)) {
				const rootLevels: string[] = [];
				levelsCache.set(item.Id, rootLevels);
				item.levels = rootLevels;
				item.level = 0;
				return rootLevels;
			}
			const parent = byId.get(item.IDParent)!;
			const parentLevels = resolveLevels(parent);
			const levels = [...parentLevels, parent.Name || ''];
			levelsCache.set(item.Id, levels);
			item.levels = levels;
			item.level = levels.length;
			return levels;
		};

		items.forEach((i) => resolveLevels(i));
	}
}
