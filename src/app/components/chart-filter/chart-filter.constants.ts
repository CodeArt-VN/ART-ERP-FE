export enum OperatorType {
  LESS_THAN = "lt",
  LESS_THAN_OR_EQUAL = "lte",
  GREATER_THAN = "gt",
  GREATER_THAN_OR_EQUAL = "gte",
  EQUAL = "eq",
  NOT_EQUAL = "ne",
  REG_EXP = "reg"
}

export const OperatorOptions = [
  {id: OperatorType.LESS_THAN, label: "Less Than"},
  {id: OperatorType.LESS_THAN_OR_EQUAL, label: "Less Than or Equal"},
  {id: OperatorType.GREATER_THAN, label: "Greater Than"},
  {id: OperatorType.GREATER_THAN_OR_EQUAL, label: "Greater Than or Equal"},
  {id: OperatorType.EQUAL, label: "Equal"},
  {id: OperatorType.NOT_EQUAL, label: "Not Equal"},
  {id: OperatorType.REG_EXP, label: "RegExp"},
]