import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class HttpService {
  
  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getUserList(): Observable<any> {
    const url = `${this.apiUrl}/usuario/listar`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      }),
    );
  }

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signin`;
    return this.http.post<any>(url, loginData).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      }),
    );
  }
  
}
