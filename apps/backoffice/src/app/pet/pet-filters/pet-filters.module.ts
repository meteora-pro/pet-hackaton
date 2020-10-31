import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFiltersComponent } from './pet-filters/pet-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FilterResolverService } from './services/filter-resolver.service';



@NgModule({
  declarations: [PetFiltersComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
  providers: [
    FilterResolverService
  ]
})
export class PetFiltersModule {}
