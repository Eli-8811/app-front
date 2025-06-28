import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { TokenMonitorService } from './services/token.monitor.service';
import { BreadcrumbService } from './services/breadcrumb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'App';

  constructor(
    private _storeService: StoreService,
    public breadcrumbService: BreadcrumbService,
  ) {
    this._storeService.initRetriveStoreData();
  }

  ngOnInit() {
    console.log('[AppComponent] ngOnInit');
  }

}
