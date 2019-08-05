import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Message } from './message';



@Component({
  selector: 'app-dataset-items',
  templateUrl: './dataset-items.component.html',
  styleUrls: ['./dataset-items.component.css']
})
export class DatasetItemsComponent implements OnInit {
  @Input() messages:Message[]
  constructor() { }

  ngOnInit() {
  }


}
