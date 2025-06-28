import { Injectable, OnDestroy } from '@angular/core';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenMonitorService implements OnDestroy {

  private stop$ = new Subject<void>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  startMonitoring(intervalMs: number): void {
    interval(intervalMs)
      .pipe(
        takeUntil(this.stop$),
        tap(() => {
          const isExpired = this.tokenService.isTokenExpired();
          console.log(`[TokenMonitor-RxJS] ${new Date().toLocaleTimeString()} - Token expired: ${isExpired}`);
          if (isExpired) {
            this.authService.logout();
          }
        })
      )
      .subscribe();
  }

  stopMonitoring(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  ngOnDestroy(): void {
    this.stopMonitoring();
  }
  
}