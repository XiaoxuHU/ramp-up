import { Component, OnInit, Input } from '@angular/core';
import { WebApp } from './webapp.interface';
import { WebAppService } from '../../WebAppService/webApp.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {
  @Input() wb:WebApp;
  constructor(
    private webAppService:WebAppService,
    private activedRoute:ActivatedRoute,
    private router:Router
  ) { }
  
  ngOnInit() {
  }

  clickHandler() {
    const subId = this.activedRoute.snapshot.paramMap.get("subId");
    const resourceGroupId = this.wb.properties.resourceGroup;
    this.webAppService.setResourceGroupId(resourceGroupId);
    this.router.navigate([subId,"web",this.wb.name]);
  }
}
