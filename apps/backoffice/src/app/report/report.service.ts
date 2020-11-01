import { Injectable } from '@angular/core';
import {PetCard} from "./templates/pet-card";
import { saveAs } from "file-saver";
import {Pet} from "@pet-hackaton/types";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private petCard = new PetCard();
  async printPetCard(pet: Pet) {
    const blob = await this.petCard.printCard(pet);
    saveAs(blob, "pet-card.docx");
  }


}
