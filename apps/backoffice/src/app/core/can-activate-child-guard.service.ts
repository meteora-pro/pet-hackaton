import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckUserAuth } from './store/authentication/authentication.actions';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationSelectors } from './store/authentication/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class CanActivateChildGuard implements CanActivateChild {
  constructor(private store: Store) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .dispatch(new CheckUserAuth())
      .pipe(map(() => this.store.selectSnapshot(AuthenticationSelectors.isSignedIn)));
  }
}
