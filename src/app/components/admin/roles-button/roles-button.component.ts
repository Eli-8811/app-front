import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { RolesDialogComponent } from '../roles-dialog/roles-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-roles-button',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './roles-button.component.html',
  styleUrl: './roles-button.component.scss'
})
export class RolesButtonComponent implements ICellRendererAngularComp {
  
  private params: any;

  constructor(private dialog: MatDialog) {}

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  openRolesDialog() {    
    this.dialog.open(RolesDialogComponent, {
      data: this.params.data.roles
    });
  }

}