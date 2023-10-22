import { EChartsOption } from "echarts/types/dist/echarts";
export interface BIReport extends Schema { 
	DataConfig?: ReportDataConfig;
	ChartConfig?: EChartsOption;
	ChartScript?: string;
	MockDataAPI?: string,
	Dimensions?: string[];
	viewDimension?: string;
}

export interface ReportDataConfig {
	TimeFrame: TimeFrame;
	CompareTo?: TimeConfig;
	Schema: Schema;
	Transform?: Transform;
	Interval?: SchemaDetail;
	CompareBy: SchemaDetail[];
	MeasureBy: SchemaDetail[];
}

export interface ReportGlobalOptions{
	TimeFrame?: TimeFrame;
};

export interface Schema {
	Type?: string;
	Id?: number;
	Code?: string;
	Name?: string;
	Remark?: string;
	Icon?: string;
	Color?: string;
	ModifiedDate?: number | string | Date;
	DataFetchDate?: number | string | Date;
}

export interface TimeFrame {
	Dimension?: string;
	From?: TimeConfig;
	To?: TimeConfig;
}

export interface TimeConfig {
	/**
	 * Relative or absolute time
	 */
	Type: string;

	/**
	 * If relative time
	 */
	IsPastDate?: boolean;
	/**
	 * If relative time
	 */
    Period?: string;
	/**
	 * If relative time
	 */
	Amount?: number;
	
	/**
	 * If absolute time
	 */
	Value?: Date;
}

export interface Transform {
	Filter?: FilterConfig;
	Sort?: SortConfig[];
}

export interface SortConfig {
	Dimension?: string;
	Order?: 'ASC'|'DESC'|'';

	Format?: 'string';
}

export interface FilterConfig {
	Dimension?: string;
	Operator?: string;
	Value?: string;

	Logicals?: FilterConfig[];

}

export interface SchemaDetail {
	Title?: string;
	Property?: string;
	Type?: string;
	Method?: string;
	Value?: any;
}