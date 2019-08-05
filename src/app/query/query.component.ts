import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubInfo } from '../WebAppService/subInfo.model';
import { Subscription } from 'rxjs';
import { WebAppService } from '../WebAppService/webApp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit, OnDestroy {

  selectedSubId: string;
  subInfoArray: SubInfo[] = [];
  private subSubscrip: Subscription;
  token:string;
  constructor(
    private webAppService: WebAppService,
    private router:Router
  ) { };
  
  //set token and get subscriptions
  setToken():void {
    this.webAppService.setToken(this.token);
    this.subSubscrip = this.webAppService.getSubs().subscribe(data => {
      this.subInfoArray = data;
    });;
  }

  getWebApps(): void {
    this.router.navigate([this.selectedSubId,"webs"]);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subSubscrip.unsubscribe();
  }
}
