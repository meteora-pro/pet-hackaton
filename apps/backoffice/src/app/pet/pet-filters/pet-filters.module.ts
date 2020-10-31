import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetFiltersComponent } from './pet-filters/pet-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FilterResolverService } from './services/filter-resolver.service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [PetFiltersComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule],
  exports: [PetFiltersComponent],
  providers: [FilterResolverService],
})
export class PetFiltersModule {}
