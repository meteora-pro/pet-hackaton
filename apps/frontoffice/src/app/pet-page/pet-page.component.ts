import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../catalog.service";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";

@Component({
  selector: 'pet-hackaton-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {


  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
  ) { }
  pet$ = this.activatedRoute.params.pipe(
    map( params => params.id ),
    filter( id => !!id),
    switchMap( id => this.catalogService.getPet(id)),
    shareReplay(),
  );
    ngOnInit(): void {
    this.activatedRoute.params.pipe();
  }

}
