import {Component, OnInit} from '@angular/core';
import {Pet} from "@pet-hackaton/types";
import {CatalogService} from "./catalog.service";

@Component({
  selector: 'pet-hackaton-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private catalogService: CatalogService) {
  }
  pets: Pet[] = [];

  ngOnInit(): void {
    this.catalogService.getPets().subscribe(response => {
      this.pets = response.data;
    })
  }
}
