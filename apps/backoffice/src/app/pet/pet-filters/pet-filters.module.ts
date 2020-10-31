import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFiltersComponent } from './pet-filters/pet-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FilterResolverService } from './services/filter-resolver.service';



@NgModule({
  declarations: [PetFiltersComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule],
  exports: [PetFiltersComponent],
  providers: [
    FilterResolverService
  ]
})
export class PetFiltersModule {}
