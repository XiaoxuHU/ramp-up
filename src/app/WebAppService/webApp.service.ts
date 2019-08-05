import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SubInfo } from './subInfo.model';
import { Observable, Observer } from 'rxjs';
import { WebApp } from '../all-apps/web-app/webapp.interface';
import { Detector } from '../all-detectors/detector';
import { DetectorDetail } from '../all-detectors/detector/detectorDetail';

interface Response {
    value:object[]
}


@Injectable({
    providedIn:"root",
})
export class WebAppService {
    constructor(
        private http:HttpClient
    ){}
    
    private token:string = "";
    private resourceGroupId:string = "";
    
    //generate http headers
    private createHttpOption():object {
        return {
            headers: new HttpHeaders({ "Authorization": this.token})
        };
    }
    //get all subscriptions
    getSubs():Observable<SubInfo[]> {
        const url = "https://management.azure.com/subscriptions?api-version=2016-06-01";
        const httpOptions = this.createHttpOption();
        return Observable.create( (observer:Observer<SubInfo[]>) => {
            this.http.get(url,httpOptions).subscribe((res:Response) => {
                observer.next(<SubInfo[]>res.value);
            })
        });
    }

    //get all web apps under subscription id
    getWebApps(subscriptionId:string):Observable<WebApp[]>{
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Web/sites?api-version=2016-08-01`;
        const httpOptions = this.createHttpOption();
        return Observable.create((observable:Observer<WebApp[]>) => {
            this.http.get(url,httpOptions).subscribe((res:Response) => {
                observable.next(<WebApp[]>res.value);
            })
        });
    }

    //get all detectors of a web app  
    getAppDetectors(subscriptionId:string,appName:string):Observable<Detector[]> {
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourcegroups/${this.resourceGroupId}/providers/microsoft.web/sites/${appName}/detectors?api-version=2015-08-01`;
        const httpOptions = this.createHttpOption();
        return Observable.create((observable:Observer<Detector[]>) => {
            this.http.get(url,httpOptions).subscribe((res:Response) => {
                observable.next(<Detector[]>res.value);
            })    
        });
    }

    //set resource group id for query app detail
    setResourceGroupId(resourceGroupId:string):void {
        this.resourceGroupId = resourceGroupId;
    }

    setToken(token:string):void{
        this.token = token;
    }

    //generate time string for getting web app detector detail
    generateTimeString(date:Date):string {
        const year: string = "" + date.getUTCFullYear();
        const month: string = date.getMonth() < 9 ? "0" + (date.getUTCMonth() + 1) : "" + (date.getUTCMonth() + 1) ;
        const day: string = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : "" + date.getUTCDate();
        const hour:string = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : "" + date.getUTCHours();
        const min:string = date.getUTCMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getUTCMinutes();
        return `${year}-${month}-${day}%20${hour}:${min}`;
    }
    
    //get web app detector detail
    getAppDetector(id:string):Observable<DetectorDetail>{
        const url = `https://management.azure.com${id}`;
        const httpOptions = this.createHttpOption();
        
        const end = new Date();
        //start date = end date - one day
        const start = new Date(Date.parse(end.toUTCString()) - 86400000);
        const endTime = this.generateTimeString(end);
        const startTime = this.generateTimeString(start);

        const httpParams = new HttpParams()
            .set("startTime",startTime)
            .set("endTime",endTime)
            .set("api-version","2015-08-01");
        httpOptions["params"] = httpParams;
        return this.http.get<DetectorDetail>(url,httpOptions);
    }
}

