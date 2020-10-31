import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../core/store/authentication/authentication.actions';
import { AuthenticationSelectors } from '../core/store/authentication/authentication.selectors';
import { UserData } from '@pet-hackaton/types';

@Component({
  selector: 'pet-hackaton-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  @Select(AuthenticationSelectors.currentUser)
  currentUser$: Observable<UserData>;

  @Select(AuthenticationSelectors.isSignedIn)
  isSignedIn$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
