import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestCrudService<T extends {id: string|number}> {

  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  getList(directoryName: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${directoryName}`);
  }

  updateItem(directoryName: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${directoryName}/${item.id}`, {
      ...item
    });
  }

  addItem(directoryName: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${directoryName}`, {
      ...item
    });
  }
}
