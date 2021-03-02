import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './components/pages/pages.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContractComponent } from './components/pages/contract/contract.component';
import { ContractListComponent } from './components/pages/contract-list/contract-list.component';
import { EmployeeComponent } from './components/pages/employee/employee.component';
import { EmployeeListComponent } from './components/pages/employee-list/employee-list.component';
import { SessionService } from './services/auth/session.service';
import { AccessService } from './services/auth/access.service';
import { PaymentComponent } from './components/pages/payment/payment.component';


const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo: 'login'},
  {
    path:'',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'contract', component: ContractComponent},
      { path: 'contract-list', component: ContractListComponent},
      { path: 'employee', component: EmployeeComponent},
      { path: 'employee-list', component: EmployeeListComponent},
      { path: 'payment', component: PaymentComponent},
      { path: '', pathMatch:'full', redirectTo: 'home'}
    ],canActivate: [SessionService]
  },

  { path:'login', component: LoginComponent},
  { path:'**', component: NotfoundComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
