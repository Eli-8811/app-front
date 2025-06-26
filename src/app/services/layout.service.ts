import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  private layoutChangedSource = new Subject<void>();
  layoutChanged$ = this.layoutChangedSource.asObservable();

  notifyLayoutChange() {
    this.layoutChangedSource.next();
  }
  
}