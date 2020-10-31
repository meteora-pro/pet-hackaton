import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FilterResolverService } from './services/filter-resolver.service';

import { PetFiltersComponent } from './pet-filters/pet-filters.component';
import { DateRangeComponent } from './pet-filters/date-range/date-range.component';
import { NumberRangeComponent } from './pet-filters/number-range/number-range.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  declarations: [
    PetFiltersComponent,
    DateRangeComponent,
    NumberRangeComponent
  ],
  exports: [
    PetFiltersComponent
  ],
  providers: [
    FilterResolverService,
    MatDatepickerModule,
  ],
})
export class PetFiltersModule {
}
