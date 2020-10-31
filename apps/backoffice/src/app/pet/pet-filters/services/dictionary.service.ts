import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDictionary, Pet, PetKind, Sex, Shelter, Size, StringDictionary } from '@pet-hackaton/types';
import { Pagination } from '../../../shared/pagination';


@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}

  static resolePagination(pagination: Pagination): string {
    return `page=${pagination.page}&limit=${pagination.perPage}`
  }

  getDict(dict: string): Observable<BaseDictionary[]> {
    return this.http.get<BaseDictionary[]>(`/api/${dict}`);
  }

  getShelters(): Observable<Shelter> {
    return this.http.get<Shelter>(`/api/shelters`);
  }

  getPets(filter: string = '', pagination: Pagination, sort: string): Observable<PetResponse> {
    const queryParams = [
      filter,
      DictionaryService.resolePagination(pagination),
      sort
    ].filter(v => !!v).join('&');
    return this.http.get<PetResponse>(`/api/pets?${queryParams}`);
  }

  getKinds(): StringDictionary[] {
    return petKinds;
  }
  getSizes(): StringDictionary[] {
    return petSizes;
  }
  getSexes(): StringDictionary[] {
    return petSexes;
  }
}

export interface PetResponse {
  data: Partial<Pet>[];
  total: number;
  count: number;
  page: number;
  pageCount: number;
}

const petKinds: StringDictionary[] = [
  { id: PetKind.cat, value: 'Кошка' },
  { id: PetKind.dog, value: 'Собака' },
];

const petSexes: StringDictionary[] = [
  { id: Sex.female, value: 'Женский' },
  { id: Sex.male, value: 'Мужской' },
];

const petSizes: StringDictionary[] = [
  { id: Size.extraSmall, value: 'Очень маленький' },
  { id: Size.small, value: 'Маленький' },
  { id: Size.medium, value: 'Средний' },
  { id: Size.big, value: 'Большой' },
  { id: Size.extraLarge, value: 'Очень большой' },
];
