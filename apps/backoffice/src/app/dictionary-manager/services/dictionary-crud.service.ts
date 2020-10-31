import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { BaseDictionary } from '../../../../../../libs/types/src';

@Injectable()
export class DictionaryCrudService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  getDictionary(dictionaryName: string): Observable<BaseDictionary[]> {
    return this.http.get<BaseDictionary[]>(`${this.apiUrl}/${dictionaryName}`);
  }

  updateDictionary(dictionaryName: string, item: BaseDictionary): Observable<BaseDictionary> {
    return this.http.put<BaseDictionary>(`${this.apiUrl}/${dictionaryName}/${item.id}`, {
      ...item
    });
  }
}
