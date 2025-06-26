import { ChangeDetectionStrategy, Component, OnInit, inject, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogOverviewExampleDialog } from '../dialog/dialog-overview';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [HttpService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  
  public passHide: boolean = true;

  readonly error = signal('');
  readonly dialog = inject(MatDialog);

  public form: FormGroup = new FormGroup({
    usernameOrEmail: new FormControl(),
    password: new FormControl(),
  });

  constructor(private _httpService: HttpService, private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.checkLogin();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
        return;
    }
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    this._httpService
    .login({ ...this.form.value })
    .subscribe({
      next: (val) => {
        this._authService.setLoginData(val);
      },
      error: (err) => {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          data: { error: err.error.message }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            this.error.set(result);
          }
        });
      }
    });
  }
 
}
