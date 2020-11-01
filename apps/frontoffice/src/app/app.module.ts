import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { PetCardComponent } from './pet-card/pet-card.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { PetPageComponent } from './pet-page/pet-page.component';
import { PetCatalogComponent } from './pet-catalog/pet-catalog.component';

@NgModule({
  declarations: [AppComponent, PetCardComponent, PetPageComponent, PetCatalogComponent],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
