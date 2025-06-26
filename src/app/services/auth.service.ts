import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { addUser, clearUser } from '../state/user.action';
import { selectUserdata } from '../state/user.selector';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public userToken: string | null = null;
  public userData: any | null = null;

  constructor(
    private _cookieService: CookieService,
    private _store: Store,
    private _router: Router,
    private _location: Location,
  ) {
    this._store.select(selectUserdata).subscribe((value: any) => {
      this.isLoggedIn = value.isLoggedIn;
      this.userToken = value.token;
      this.userData = value.data;
    });
  }

setLoginData(data: any) {
  if (!data || !data.accessToken) return;
  const decodedToken = jwtDecode(data.accessToken);
  this._store.dispatch(
    addUser({ payload: { data: decodedToken, token: data.accessToken, isLoggedIn: true } }),
  );
  if (data.accessToken) {
    this._cookieService.set(
      'X-Auth-Token',
      data.accessToken,
      30,
      '/',
      undefined,
      true,
      'Lax',
    );
  }
  this._router.navigateByUrl('/admin');
  this._location.replaceState('/admin');
}

  public logout() {
    this.isLoggedIn = false;
    this.userToken = null;
    this._store.dispatch(clearUser());
    this._cookieService.delete('X-Auth-Token');
    this._router.navigateByUrl('/');
    this._location.replaceState('/');
  }

  public checkLogin() {
    if (this.isLoggedIn) {
      this._router.navigateByUrl('/admin');
      this._location.replaceState('/admin');
    }
  }
}
