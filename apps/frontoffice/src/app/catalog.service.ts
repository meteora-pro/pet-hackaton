import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {PagedResponse, Pet} from "@pet-hackaton/types";


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPets() {
    return this.httpClient.get<PagedResponse<Pet>>(`${environment.baseUrl}/pets?join=breed&limit=150`);
  }
}
