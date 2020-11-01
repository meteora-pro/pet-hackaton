import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BaseDictionary,
  Pet,
  PetKind,
  PetStatuses,
  Role,
  Sex,
  Shelter,
  Size,
  SimpleDictionary,
  User
} from '@pet-hackaton/types';import { Pagination } from '../../../shared/pagination';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  static resolePagination(pagination: Pagination): string {
    return `page=${pagination.page}&limit=${pagination.perPage}`
  }

  getDict(dict: string): Observable<BaseDictionary[]> {
    return this.http.get<BaseDictionary[]>(`${this.apiUrl}/${dict}`);
  }

  getShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.apiUrl}/shelters`);
  }

  getPets(filter: string = '', pagination: Pagination, sort: string): Observable<PetResponse> {
    const queryParams = [
      filter,
      DictionaryService.resolePagination(pagination),
      sort
    ].filter((v) => !!v).join('&');
    return this.http.get<PetResponse>(`${this.apiUrl}/pets?${queryParams}`);
  }

  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/pets/${id}`);
  }

  createPet(pet: Partial<Pet>): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/pets`, pet);
  }

  updatePet(id: number, pet: Partial<Pet>): Observable<Pet> {
    return this.http.patch<Pet>(`${this.apiUrl}/pets/${id}`, pet);
  }

  getUsersByRole(role: Role): Observable<User[]> {
    const queryParams = role ? `filter=role||$eq||${role}` : '';
    return this.http.get<User[]>(`${this.apiUrl}/users?${queryParams}`);
  }

  getKinds(): SimpleDictionary[] {
    return petKinds;
  }
  getSizes(): SimpleDictionary[] {
    return petSizes;
  }
  getSexes(): SimpleDictionary[] {
    return petSexes;
  }
  getStatuses(): SimpleDictionary[] {
    return petStatuses;
  }
}

export interface PetResponse {
  data: Partial<Pet>[];
  total: number;
  count: number;
  page: number;
  pageCount: number;
}

const petKinds: SimpleDictionary[] = [
  { id: PetKind.cat, value: 'Кошка' },
  { id: PetKind.dog, value: 'Собака' },
];

const petStatuses: SimpleDictionary[] = [
  { id: true, value: 'Социализировано' },
  { id: false, value: 'Не социализировано' },
];

const petSexes: SimpleDictionary[] = [
  { id: Sex.female, value: 'Женский' },
  { id: Sex.male, value: 'Мужской' },
];

const petSizes: SimpleDictionary[] = [
  { id: Size.extraSmall, value: 'Очень маленький' },
  { id: Size.small, value: 'Маленький' },
  { id: Size.medium, value: 'Средний' },
  { id: Size.big, value: 'Большой' },
  { id: Size.extraLarge, value: 'Очень большой' },
];
