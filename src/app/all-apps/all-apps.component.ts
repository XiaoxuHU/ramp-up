import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebAppService } from '../WebAppService/webApp.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebApp } from './web-app/webapp.interface';

@Component({
  selector: 'app-all-apps',
  templateUrl: './all-apps.component.html',
  styleUrls: ['./all-apps.component.css']
})
export class AllAppsComponent implements OnInit,OnDestroy {
  private webAppsSub: Subscription;
  webapps: WebApp[];
  constructor(
    private webAppService: WebAppService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const subId = this.router.snapshot.paramMap.get("subId");
    this.webAppsSub = this.webAppService.getWebApps(subId).subscribe( data => {
      this.webapps = data;
      console.log(data);
    })
  }

  ngOnDestroy() {
    this.webAppsSub.unsubscribe();
  }
}
