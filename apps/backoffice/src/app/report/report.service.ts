import { Injectable } from '@angular/core';
import {PetCard} from "./templates/pet-card";
import { saveAs } from "file-saver";
import {Pet} from "@pet-hackaton/types";
import { DatePipe } from '@angular/common';
import { cleanObj } from '../shared/object-cleaner';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private datePipe: DatePipe) {
  }
  private petCard = new PetCard(this.datePipe);
  async printPetCard(pet: Pet) {
    const blob = await this.petCard.printCard(cleanObj(pet));
    saveAs(blob, "pet-card.docx");
  }
}
