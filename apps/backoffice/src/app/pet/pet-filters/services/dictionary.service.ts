import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDictionary, Pet, PetKind, Sex, Shelter, Size, StringDictionary, User } from '@pet-hackaton/types';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}

  getDict(dict: string): Observable<BaseDictionary[]> {
    return this.http.get<BaseDictionary[]>(`/api/${dict}`);
  }

  getShelters(): Observable<Shelter> {
    return this.http.get<Shelter>(`/api/shelters`);
  }

  getPets(filter: string = '', pagination: string, sort: string): Observable<PetResponse> {
    const queryParams = [filter, pagination, sort].filter((v) => !!v).join('&');
    return this.http.get<PetResponse>(`/api/pets?${queryParams}`);
  }

  getUsersByRole(role: string): Observable<User[]> {
    const queryParams = role ? `filter=role||$eq||${role}` : '';
    return this.http.get<User[]>(`/api/users?${queryParams}`);
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
