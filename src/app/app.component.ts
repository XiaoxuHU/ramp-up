import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubInfo } from './WebAppService/subInfo.model';
import { WebAppService } from './WebAppService/webApp.service';
import { Observable } from 'rxjs';
import { WebApp } from './all-apps/web-app/webapp.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
  }
}
