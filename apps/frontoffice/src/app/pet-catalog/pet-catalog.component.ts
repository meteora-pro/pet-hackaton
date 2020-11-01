import { Component, OnInit } from '@angular/core';
import {CatalogService} from "../catalog.service";
import {Pet} from "@pet-hackaton/types";

@Component({
  selector: 'pet-hackaton-pet-catalog',
  templateUrl: './pet-catalog.component.html',
  styleUrls: ['./pet-catalog.component.scss']
})
export class PetCatalogComponent implements OnInit {

  constructor(private catalogService: CatalogService) {
  }
  pets: Pet[] = [];

  ngOnInit(): void {
    this.catalogService.getPets().subscribe(response => {
      this.pets = response.data;
    })
  }

  openModal(): void {
    // Реализовать открытие модалки для заявки
  }
}
