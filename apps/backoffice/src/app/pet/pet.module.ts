import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { PetFiltersModule } from './pet-filters/pet-filters.module';
import { NgxsModule } from '@ngxs/store';
import { PetsState } from './store/pets.state';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DictionaryPipeModule } from '../shared/dictionary.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: 'list',
    component: PetListComponent,
  },
  {
    path: 'create',
    component: PetCardComponent,
  },
];

@NgModule({
  declarations: [PetListComponent, PetCardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PetFiltersModule,
    NgxsModule.forFeature([PetsState]),
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    LazyLoadImageModule,
    DictionaryPipeModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRippleModule,
  ],
})
export class PetModule {}
