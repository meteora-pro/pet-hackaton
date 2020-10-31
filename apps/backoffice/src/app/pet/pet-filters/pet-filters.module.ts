import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFiltersComponent } from './pet-filters/pet-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [PetFiltersComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
})
export class PetFiltersModule {}
