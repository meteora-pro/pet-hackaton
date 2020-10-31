export interface Pagination {
  page: number;
  perPage: number;
  sort: SortEnum;
  total?: number;
  count?: number;
  pageCount?: number;
}

export enum SortEnum {
  asc = 'asc',
  decs = 'decs'
}
