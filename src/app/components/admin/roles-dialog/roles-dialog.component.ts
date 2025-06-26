import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-roles-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './roles-dialog.component.html',
  styleUrl: './roles-dialog.component.scss'
})
export class RolesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public roles: any) {}
}