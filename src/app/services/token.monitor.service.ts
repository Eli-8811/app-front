import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TokenMonitorService {
  private intervalId: any;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  startMonitoring(intervalMs: number): void {
    this.stopMonitoring();
    this.intervalId = setInterval(() => {
      const isExpired = this.tokenService.isTokenExpired();
      console.log(`[TokenMonitor] ${new Date().toLocaleTimeString()} - Token expired: ${isExpired}`);

      if (isExpired) {
        this.authService.logout();
      }
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}