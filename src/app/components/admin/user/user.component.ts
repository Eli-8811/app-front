import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RolesButtonComponent } from '../roles-button/roles-button.component';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AgGridModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RolesButtonComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [HttpService],
})
export class UserComponent implements OnInit {
  
  constructor(private _httpService: HttpService) {}

  gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Nombre', sortable: true, filter: true },
    { field: 'username', headerName: 'Usuario', sortable: true, filter: true },
    { field: 'email', headerName: 'Correo', sortable: true, filter: true },
    {
      headerName: 'Roles y permisos',
      cellRenderer: RolesButtonComponent,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha Creación',
      sortable: true,
      filter: true,
      valueFormatter: (params: any) =>
        new Intl.DateTimeFormat('es-MX', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(params.value)),
    },
    {
      field: 'updatedAt',
      headerName: 'Fecha Modificación',
      sortable: true,
      filter: true,
      valueFormatter: (params: any) =>
        new Intl.DateTimeFormat('es-MX', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(params.value)),
    },
  ];

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this._httpService.getUserList().subscribe((response) => {
      this.rowData = response.data;
      setTimeout(() => {
        this.gridApi?.sizeColumnsToFit();
      });
    });
  }

  onGridReady(params: { api: GridApi }) {
    this.gridApi = params.api;
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.gridApi?.sizeColumnsToFit();
  }

}