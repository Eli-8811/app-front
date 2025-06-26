import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserComponent } from './user/user.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(private layoutService: LayoutService) {}

  isSidebarOpen = true;

  @ViewChild(UserComponent) userComponent!: UserComponent;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    setTimeout(() => {
      this.layoutService.notifyLayoutChange();
    }, 310);
  }

  onDrawerChange() {
    this.layoutService.notifyLayoutChange();
  }

}
