import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserdata } from '../../../state/user.selector';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [MatCardModule, MatListModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  
  userData$: Observable<any>;

  constructor(private store: Store) {
    this.userData$ = this.store.select(selectUserdata);
  }

  ngOnInit(): void {}

}