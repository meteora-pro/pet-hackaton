import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDictionary, Pet, PetKind, Sex, Shelter, Size, StringDictionary } from '@pet-hackaton/types';


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

  getPets(filter: string = '') {
    return this.http.get<Pet[]>(`/api/pets?${filter}`);
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
