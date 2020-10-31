import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'shelter',
        loadChildren: () => import('./shelter/shelter.module').then((m) => m.ShelterModule),
      },
      {
        path: 'pet',
        loadChildren: () => import('./pet/pet.module').then((m) => m.PetModule),
      },
      {
        path: 'dictionary',
        loadChildren: () => import('./dictionary-manager/dictionary-manager.module').then((m) => m.DictionaryManagerModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
