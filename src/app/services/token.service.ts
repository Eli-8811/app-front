import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  exp: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  
  private _token: string | null = null;

  constructor(private store: Store<AppState>) {
    this.store
      .select((state) => state.user?.token)
      .subscribe((token) => {
        this._token = token;
      });
  }

  getToken(): string | null {
    return this._token;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (e) {
      return true;
    }
  }
}
