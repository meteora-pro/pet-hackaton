import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ShelterListComponent } from './containers/shelter-list/shelter-list.component';
import { NgxsModule } from '@ngxs/store';
import { ShelterState } from './store/shelter.state';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: 'list',
    component: ShelterListComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxsModule.forFeature([ShelterState])],
  declarations: [ShelterListComponent],
})
export class ShelterModule {}
