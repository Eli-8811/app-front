import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RolesButtonComponent } from '../roles-button/roles-button.component';
import { GridApi } from 'ag-grid-community';
import { LayoutService } from '../../../services/layout.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AgGridModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RolesButtonComponent,
    MatGridListModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [HttpService],
})
export class UserComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private layoutService: LayoutService,
  ) {}

  gridApi!: GridApi;
  rowData: any[] = [];

  columnDefs = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Nombre', sortable: true, filter: true },
    { field: 'username', headerName: 'Usuario', sortable: true, filter: true },
    { field: 'email', headerName: 'Correo', sortable: true, filter: true },
    {
      headerName: 'Roles y permisos',
      cellRenderer: RolesButtonComponent,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha creación',
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
      headerName: 'Fecha modificación',
      sortable: true,
      filter: true,
      valueFormatter: (params: any) =>
        new Intl.DateTimeFormat('es-MX', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(params.value)),
    },
  ];

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.getUserList();
    this.layoutService.layoutChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.gridApi && !this.gridApi.isDestroyed()) {
          this.gridApi.sizeColumnsToFit();
        }
      });
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
}
