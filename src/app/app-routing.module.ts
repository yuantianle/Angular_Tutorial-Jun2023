import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Public/home.component';
import { loginGuard } from './Core/Guards/login.guard';
import { adminGuard } from './Core/Guards/admin.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Account", loadChildren: () => import('./Account/account.module').then(m => m.AccountModule)},
  { path: "Admin", loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule), canMatch: [adminGuard]},
  { path: "User", loadChildren: () => import('./User/user.module').then(m => m.UserModule), canActivateChild: [loginGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
