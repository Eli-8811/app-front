import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  constructor(private _authService: AuthService) {}

  @Output() toggleSidebar = new EventEmitter<void>();

  logout() {
    this._authService.logout();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

}