import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PagesComponent } from './components/pages/pages.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ContractComponent } from './components/pages/contract/contract.component';
import { CustomerComponent } from './components/pages/customer/customer.component';
import { FinancialDateComponent } from './components/pages/financial-date/financial-date.component';
import { VehicleComponent } from './components/pages/vehicle/vehicle.component';

// Charts
import { ChartsModule } from 'ng2-charts';

// Services
import { HttpClientModule } from '@angular/common/http';
// Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule} from '@angular/material/stepper';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContractListComponent } from './components/pages/contract-list/contract-list.component';
import { EmployeeComponent } from './components/pages/employee/employee.component';
import { EmployeeListComponent } from './components/pages/employee-list/employee-list.component';
import { PaymentComponent } from './components/pages/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    LoginComponent,
    NotfoundComponent,
    PagesComponent,
    HomeComponent,
    ContractComponent,
    CustomerComponent,
    FinancialDateComponent,
    VehicleComponent,
    ContractListComponent,
    EmployeeComponent,
    EmployeeListComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
