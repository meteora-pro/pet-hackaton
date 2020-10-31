export type typeFilter = 'like' | 'numberRange' | 'dateRange' | 'in' | 'eq';

export interface FilterNumberRange {
  from: number;
  to: number;
}

export interface PetFilter {
  cardNumber: string,
  labelId: string,
  name: string,
  district: number[],
  shelterIds: number[],
  createdAt: string[],
  kind: number[],
  age: FilterNumberRange,
  size: number[],
  outReason: number[],
  status: number[],
}
