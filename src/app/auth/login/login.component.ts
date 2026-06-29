import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      username: ['analyst', Validators.required],
      password: ['demo123', Validators.required],
    });
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const { username, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
