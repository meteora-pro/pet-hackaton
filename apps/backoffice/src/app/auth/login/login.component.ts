import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'pet-hackaton-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  }, {
    updateOn: 'blur'
  });

  errors: ValidationErrors;
  hidePassword = true;

  submit() {
    if (this.form.valid) {
    }
    console.log('[form]', this.form);
    this.errors = {
      username: this.form.get('username').errors,
      password: this.form.get('password').errors,
    };
  }

}
