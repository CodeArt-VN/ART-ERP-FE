import { EChartsOption } from 'echarts/types/dist/echarts';

//Wiget interface
//{"x":0,"y":4,"cols":3,"rows":1,"IDReport":7,"Id":0, WidgetConfig: { ViewDimension: 'CalcTotal'}},
export interface Widget {
  x?: number;
  y?: number;
  cols?: number;
  rows?: number;
  Id?: number;
  IDReport?: number;
  Config?: WidgetConfig;
}

//Widget config interface
export interface WidgetConfig {
  Type?: 'Chart' | 'Summary card', 'Data table' ;
  ChartDimension?: string ;
  SummaryCards?: string[];
  Layout?: any;
}



export interface BIReport extends Schema {
  DataConfig?: ReportDataConfig;
  ChartConfig?: EChartsOption;
  ChartConfigScript?: string;
  ChartScript?: string;
  MockDataAPI?: string;
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

export interface ReportGlobalOptions {
  TimeFrame?: TimeFrame;
}

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

  Fields?: SchemaDetail[];
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

  /**
   * If null
   */
  IsNull?: boolean;
}

export interface Transform {
  Filter?: FilterConfig;
  Sort?: SortConfig[];
}

export interface SortConfig {
  Dimension?: string;
  Order?: 'ASC' | 'DESC' | '';

  Format?: 'string';
}

export interface FilterConfig {
  Dimension?: string;
  Operator?: string;
  Value?: string;

  Logicals?: FilterConfig[];
}

export interface SchemaDetail {
  IDSchema?: number;
  Id?: number;
  PropertyType?: string;
  DataType?: string;
  Format?: string;
  Aggregate?: string;
  Icon?: string;
  Color?: string;
  Code?: string;
  Name?: string;
  Remark?: string;

  Sort?: number;

  //For UI only
  Title?: string;
  Property?: string;
  Type?: string;
  Method?: string;

  Value?: any; //To show in UI only
  ComparitionValue?: any; //To show in UI only
}
