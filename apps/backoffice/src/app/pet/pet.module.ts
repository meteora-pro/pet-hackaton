import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { PetFiltersModule } from './pet-filters/pet-filters.module';
import { NgxsModule } from '@ngxs/store';
import { PetsState } from './store/pets.state';
import { MatTableModule } from '@angular/material/table';

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
  ],
})
export class PetModule {}
