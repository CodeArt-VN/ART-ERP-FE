




export interface ReportConfig {
	ReprotInfo: BIReport;
	TimeFrame: TimeFrame;
	CompareTo?: TimeConfig;
	Schema: Schema;
	Transform?: Transform;
	Interval?: SchemaDetail;
	CompareBy: SchemaDetail[];
	MeasureBy: SchemaDetail[];
}


export interface BIReport extends Schema { }

export interface Schema {
	Type?: string;
	Id?: number;
	Code?: string;
	Name?: string;
	Remark?: string;
	ModifiedDate?: number | string | Date;
	LastDataModifiedDate?: number | string | Date;
}

export interface TimeFrame {
	From?: TimeConfig;
	To?: TimeConfig;
}

export interface TimeConfig {
	Type?: string;
	Value?: Date;
}

export interface Transform {
	Filter?: ConfigFilter;

}

export interface ConfigFilter {
	Dimension?: string;
	Operator?: string;
	Value?: string;

	Logicals?: ConfigFilter[];

}

export interface SchemaDetail {
	Title?: string;
	Property?: string;
	Type?: string;
	Method?: string;
}