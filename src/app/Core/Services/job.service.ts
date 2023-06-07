import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/Shared/Models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  getAllJobs(): Observable<Job[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', '737cfeee088b431ba22054fae116f5b7')
    return this.http.get<Job[]>("https://may2023apigateway1.azure-api.net/recruiting/api/Jobs",{headers:{'Ocp-Apim-Subscription-Key': '737cfeee088b431ba22054fae116f5b7'}});
  }
}
