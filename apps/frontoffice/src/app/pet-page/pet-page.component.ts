import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../services/catalog.service";
import { catchError, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PetOrderInterface } from '../models/pet-order.interface';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'pet-hackaton-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private modalService: NgbModal,
    public toastService: ToastService
  ) { }

  pet$ = this.activatedRoute.params.pipe(
    map( params => params.id ),
    filter( id => !!id),
    switchMap( id => {
      return this.catalogService.getPet(id)
    }),
    tap((pet) => {
      this.petOrder.petId = pet.id;
    }),
    shareReplay(),
  );

  closeResult = '';

  petOrder: PetOrderInterface = {
    petId: null,
    fullName: null,
    phone: null,
  };

  ngOnInit(): void {
    this.activatedRoute.params.pipe();
  }

  openModal(content): void {
    const modalResult = fromPromise(this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result);
    modalResult.pipe(
      switchMap((result) => {
        if (result) {
          return this.catalogService.createOrder(this.petOrder);
        }
        return of(false)
      }),
      take(1),
      catchError((err) => {
        if (typeof err === 'object') {
          this.showDanger();
        }
        return throwError(err);
      })
    ).subscribe((response) => {
      if (response) {
        this.showSuccess();
      }
    });
  }

  private showSuccess() {
    this.toastService.show('Ваша заявка отправлена! С вами свяжется сотрудник питомника!', {
      classname: 'bg-success text-light',
      delay: 5000
    });
  }

  private showDanger() {
    this.toastService.show('Произошла ошибка! Попробуйте позже', { classname: 'bg-danger text-light', delay: 5000 });
  }
}
