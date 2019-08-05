import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryComponent } from './query/query.component'
import { AllAppsComponent } from './all-apps/all-apps.component';
import { AllDetectorsComponent } from './all-detectors/all-detectors.component';


const routes: Routes = [
  {path : '',redirectTo:'/query',pathMatch:'full'},
  {path : 'query',component:QueryComponent},
  {path : ':subId/webs',component:AllAppsComponent},
  {path : ':subId/web/:name',component:AllDetectorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
