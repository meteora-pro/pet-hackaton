import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDictionary, Pet, PetKind, Shelter } from '@pet-hackaton/types';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  getDict(dict: string): Observable<BaseDictionary> {
    return this.http.get<BaseDictionary>(`/api/${dict}`);
  }

  getShelters(): Observable<Shelter> {
    return this.http.get<Shelter>(`/api/shelters`);
  }

  getPets(filter: string = '') {
    return this.http.get<Pet[]>(`/api/pets?${filter}`);
  }

  getKinds() {
    return petKinds;
  }
}

const petKinds: {id: PetKind, value: string}[] = [
  { id: PetKind.cat, value: 'Кошка' },
  { id: PetKind.dog, value: 'Собака' },
]
