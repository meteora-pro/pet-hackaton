import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { GetUserMe, SignIn } from '../../core/store/authentication/authentication.actions';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-hackaton-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private store: Store, public actions$: Actions, private router: Router) {}

  form: FormGroup = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
    },
    {
      updateOn: 'blur',
    }
  );

  errors: ValidationErrors;
  hidePassword = true;

  ngOnInit(): void {
    this.actions$
      .pipe(ofActionSuccessful(GetUserMe), first(Boolean))
      .subscribe(() => this.router.navigate(['/pet/list']));
  }

  submit() {
    if (this.form.valid) {
    }
    this.errors = {
      username: this.form.get('username').errors,
      password: this.form.get('password').errors,
    };

    this.store.dispatch(new SignIn(this.form.value.username, this.form.value.password));
  }
}
