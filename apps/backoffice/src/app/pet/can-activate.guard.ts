import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoadPet, ResetPet, SetPetFormMode } from './store/pets.actions';

@Injectable({ providedIn: 'root' })
export class CanActivateGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params && route.params.id) {
      this.store.dispatch([new LoadPet(route.params.id)]);
    } else {
      this.store.dispatch(new ResetPet());
    }
    this.store.dispatch(new SetPetFormMode(route?.params?.mode));
    return true;
  }
}
