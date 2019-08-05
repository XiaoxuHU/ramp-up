import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WebAppService } from 'src/app/WebAppService/webApp.service';
import { Subscription } from 'rxjs';
import { DatasetItem } from './detectorDetail';
import { Message } from './dataset-items/message';



@Component({
  selector: 'app-detector',
  templateUrl: './detector.component.html',
  styleUrls: ['./detector.component.css']
})
export class DetectorComponent implements OnInit,OnDestroy {
  @Input() detectorId:string;
  private detectorDetailSub:Subscription;
  messages:Message[] = [];
  description:string = "";
  category:string = "";
  statusId:number;
  name:string = "";
  constructor(private webAppService:WebAppService){ }
  
  ngOnInit() {   
    this.detectorDetailSub = this.webAppService.getAppDetector(this.detectorId).subscribe(data => {
      this.name = data.properties.metadata.name;
      this.description = data.properties.metadata.description;
      this.category = data.properties.metadata.category;
      this.statusId = data.properties.status.statusId;
      if (data.properties.dataset) {
        this.messages = this.getAllMessages(data.properties.dataset);
      }
    })
  }

  getAllMessages(datasetItems:DatasetItem[]):Message[] {
    const messages:Message[] = [];
    for (let datasetItem of datasetItems) {
      const columns = datasetItem.table.columns;
      if (columns.length >= 2 && columns[0].columnName === "Status" &&columns[1].columnName === "Message"){
        const status = datasetItem.table.rows[0][0];
        const message = datasetItem.table.rows[0][1];
        messages.push(new Message(status,message));
      }
    }
    return messages;
  }
  ngOnDestroy() {
    this.detectorDetailSub.unsubscribe();
  }
}
