import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WebappComponent } from './all-apps/web-app/webapp.component';
import { DetectorComponent } from './all-detectors/detector/detector.component';
import { QueryComponent } from './query/query.component';
import { AllAppsComponent } from './all-apps/all-apps.component';
import { AllDetectorsComponent } from './all-detectors/all-detectors.component';
import { DatasetItemsComponent } from './all-detectors/detector/dataset-items/dataset-items.component';


@NgModule({
  declarations: [
    AppComponent,
    WebappComponent,
    DetectorComponent,
    QueryComponent,
    AllAppsComponent,
    AllDetectorsComponent,
    DatasetItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
