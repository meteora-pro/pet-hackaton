import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { PagedResponse, Pet} from "@pet-hackaton/types";
import { PetOrderInterface } from '../models/pet-order.interface';


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

  getPet(id: string) {
    return this.httpClient.get<Pet>(`${environment.baseUrl}/pets/${id}?join=breed&join=shelter&join=color&join=size`)
  }

  createOrder(order: PetOrderInterface) {
    return this.httpClient.post<Pet>(`${environment.baseUrl}/orders`, {
      ...order,
      pet: {
        id: order.petId
      }
    })
  }
}
