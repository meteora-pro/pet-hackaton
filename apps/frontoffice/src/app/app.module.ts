import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { PetCardComponent } from './pet-card/pet-card.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AppComponent, PetCardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
