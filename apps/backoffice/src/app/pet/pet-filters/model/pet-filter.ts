export enum FilterTypeEnum {
  like = 'like',
  numberRange = 'numberRange',
  dateRange = 'dateRange',
  in = 'in',
  eq = 'eq',
}

export interface FilterNumberRange {
  from: number;
  to: number;
}

export interface FilterDateRange {
  from: string;
  to: string;
}

export interface PetFilter {
  cardNumber: string;
  labelId: string;
  name: string;
  district: number[];
  shelterIds: number[];
  createdAt: FilterDateRange;
  kind: number[];
  age: FilterNumberRange;
  size: number[];
  outReason: number[];
  isSocializated: number[];
}
