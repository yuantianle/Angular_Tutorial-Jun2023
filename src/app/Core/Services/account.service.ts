import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from 'src/app/Shared/Models/Login';
import { Register } from 'src/app/Shared/Models/Register';
import { User, UserWAdmin } from 'src/app/Shared/Models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject=new BehaviorSubject<UserWAdmin>({} as UserWAdmin);
  public currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  Register(registerData:Register): Observable<boolean> {
    //let headers = new HttpHeaders();
    //headers = headers.set('Ocp-Apim-Subscription-Key', '737cfeee088b431ba22054fae116f5b7')
    return this.http.post<boolean>("https://may2023apigateway1.azure-api.net/recruiting/api/account/register", registerData, { headers: { 'Ocp-Apim-Subscription-Key': environment.subscriptionKey } });
  }

  Login(loginData:Login):Observable<boolean>{
    return this.http.post<boolean>("https://may2023apigateway1.azure-api.net/recruiting/api/account/login", loginData, { headers: { 'Ocp-Apim-Subscription-Key': environment.subscriptionKey } }).pipe(map((response: any) => {
      if(response) {
        localStorage.setItem('token', response.token);
        this.populateUserInfoFromToken();
        return true;
      }
      else {
        return false;
      }
      }));
  }

  Logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next({} as UserWAdmin);
    this.isLoggedInSubject.next(false);
  }

  populateUserInfoFromToken() {
    var tokenValue = localStorage.getItem('token');
    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)) {
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.isLoggedInSubject.next(true);
      const newUser:UserWAdmin = {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        password: decodedToken.password,
        isAdmin: true
      };
      this.currentUserSubject.next(newUser);
    }
  }

  ValidateJWTToken() {
    var tokenValue = localStorage.getItem('token');
    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)) {
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.populateUserInfoFromToken();
    }
  }
}
