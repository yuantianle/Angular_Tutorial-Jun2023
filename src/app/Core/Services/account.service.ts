import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/Shared/Models/Register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  Register(registerData:Register): Observable<boolean> {
    //let headers = new HttpHeaders();
    //headers = headers.set('Ocp-Apim-Subscription-Key', '737cfeee088b431ba22054fae116f5b7')
    return this.http.post<boolean>("https://may2023apigateway1.azure-api.net/recruiting/api/account/login", registerData, { headers: { 'Ocp-Apim-Subscription-Key': environment.subscriptionKey } });
  }

}
