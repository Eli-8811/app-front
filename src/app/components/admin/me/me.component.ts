import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserdata } from '../../../state/user.selector';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  
  userData$: Observable<any>;
  email: string | null = null;

  constructor(private store: Store) {
    this.userData$ = this.store.select(selectUserdata);
  }

  ngOnInit(): void {
    this.userData$.subscribe(data => {
      if (data) {
        this.email = data.data.email;
        console.log('First Name: ', this.email);
      }
    });
  }
}
