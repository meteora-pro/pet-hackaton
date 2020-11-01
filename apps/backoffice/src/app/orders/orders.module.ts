import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';

const routes: Route[] = [
  {
    path: 'list',
    component: OrdersListComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'pet/list' },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  declarations: [OrdersListComponent],
})
export class OrdersModule {}
