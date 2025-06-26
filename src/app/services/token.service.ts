import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";

@Injectable({ providedIn: 'root' })
export class TokenService {
  
  private _token: string | null = null;

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.user?.token).subscribe(token => {
      this._token = token;
    });
  }

  getToken(): string | null {
    return this._token;
  }

}
