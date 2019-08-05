import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebAppService } from '../WebAppService/webApp.service';
import { ActivatedRoute } from '@angular/router';
import { Detector } from './detector';

@Component({
  selector: 'app-all-detectors',
  templateUrl: './all-detectors.component.html',
  styleUrls: ['./all-detectors.component.css']
})
export class AllDetectorsComponent implements OnInit,OnDestroy {
  detectors:Detector[];
  private detectorSub:Subscription;
  constructor(
    private webAppService:WebAppService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    const subId = this.activatedRoute.snapshot.paramMap.get("subId");
    const name = this.activatedRoute.snapshot.paramMap.get("name");
    this.detectorSub = this.webAppService.getAppDetectors(subId,name).subscribe( data => {
      this.detectors = data;
      console.log(this.detectors);
    });
  }
  ngOnDestroy() {
    this.detectorSub.unsubscribe();
  }
}
