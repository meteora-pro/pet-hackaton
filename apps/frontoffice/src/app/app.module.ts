import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { PetCardComponent } from './pet-catalog/pet-card/pet-card.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { PetPageComponent } from './pet-page/pet-page.component';
import { PetCatalogComponent } from './pet-catalog/pet-catalog.component';
import { HeaderComponent } from './layout/header/header.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ModalPetOrderComponent } from './pet-page/modal-pet-order/modal-pet-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  declarations: [AppComponent, PetCardComponent, PetPageComponent, PetCatalogComponent, HeaderComponent, ModalPetOrderComponent, ToastComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([{
      path: 'pet/:id',
      component: PetPageComponent,
    }, {
      path: '**',
      component: PetCatalogComponent,
    }]),
    LazyLoadImageModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
