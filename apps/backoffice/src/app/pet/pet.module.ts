import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetFormComponent } from './pet-form/pet-form.component';
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
import { DictionaryPipeModule } from '../shared/dictionary/dictionary.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AttributeStatusComponent } from './pet-list/columns/attribute-status/attribute-status.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CanActivateGuard } from './can-activate.guard';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: 'list',
    component: PetListComponent,
  },
  {
    path: 'create',
    component: PetFormComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: ':id/:mode',
    component: PetFormComponent,
    canActivate: [CanActivateGuard],
  },
];

@NgModule({
  declarations: [PetListComponent, PetFormComponent, AttributeStatusComponent],
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
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTabsModule,
  ],
})
export class PetModule {}
