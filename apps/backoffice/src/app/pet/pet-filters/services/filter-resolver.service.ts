import { Injectable } from '@angular/core';
import { PetFilter, FilterTypeEnum } from '../model/pet-filter';

@Injectable()
export class FilterResolverService {
  constructor() {}

  resolve(data: PetFilter): string {
    const filters: string[] = [];
    Object.keys(data).forEach((filterName) => {
      const filterType = resolverMap[filterName];
      const value = data[filterName];
      if (value) {
        switch (filterType) {
          case FilterTypeEnum.like: {
            filters.push([filterName, '$cont', value].join('||'));
            break;
          }
          case FilterTypeEnum.in: {
            if (value.length) {
              filters.push([filterName, '$in', [...value].join(',')].join('||'));
            }
            break;
          }
          case FilterTypeEnum.eq: {
            filters.push([filterName, '$eq', value].join('||'));
            break;
          }
          case FilterTypeEnum.numberRange:
          case FilterTypeEnum.dateRange:
            if (value.from) {
              filters.push([filterName, '$gte', new Date(value.from).toISOString()].join('||'));
            }
            if (value.to) {
              filters.push([filterName, '$lte', new Date(value.to).toISOString()].join('||'));
            }
            break;
        }
      }
    });
    return filters.map((filter) => `filter=${filter}`).join('&');
  }
}

const resolverMap: { [key in keyof PetFilter]: FilterTypeEnum } = {
  cardNumber: FilterTypeEnum.like,
  labelId: FilterTypeEnum.like,
  name: FilterTypeEnum.like,
  district: FilterTypeEnum.in,
  shelterIds: FilterTypeEnum.in,
  createdAt: FilterTypeEnum.dateRange,
  kind: FilterTypeEnum.in,
  age: FilterTypeEnum.numberRange,
  size: FilterTypeEnum.in,
  outReason: FilterTypeEnum.in,
  status: FilterTypeEnum.in,
};
