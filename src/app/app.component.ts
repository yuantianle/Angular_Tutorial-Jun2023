import { Component } from '@angular/core';
import { AccountService } from './Core/Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HRM System';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.accountService.ValidateJWTToken();
    }
  }
}
