import { Injectable } from '@angular/core';
import { PetFilter, typeFilter } from '../model/pet-filter';

@Injectable()
export class FilterResolverService {

  constructor() {
  }

  resolve(data: PetFilter) {

  }
}

export type petKeys = keyof PetFilter;

const resolverMap: { [name: string]: typeFilter } = {
  cardNumber: 'like',
  labelId: 'like',
  name: 'like',
  district: 'in',
  shelterIds: 'in',
  createdAt: 'dateRange',
  kind: 'in',
  age: 'numberRange',
  size: 'in',
  outReason: 'in',
  status: 'in',
};
