export interface Pagination {
  page: number,
  perPage: number,
  sort: SortEnum
}

export enum SortEnum {
  asc = 'asc',
  decs = 'decs'
}
