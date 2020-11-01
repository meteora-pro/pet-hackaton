import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../catalog.service";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pet-hackaton-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private modalService: NgbModal
  ) { }

  pet$ = this.activatedRoute.params.pipe(
    map( params => params.id ),
    filter( id => !!id),
    switchMap( id => this.catalogService.getPet(id)),
    shareReplay(),
  );

  closeResult = '';

  ngOnInit(): void {
    this.activatedRoute.params.pipe();
  }

  openModal(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
