import { OnInit,Component, Output, EventEmitter } from '@angular/core';
import { customerModel } from '../../../models/customer.model';
import { spouseModel } from '../../../models/spouse.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerExist: boolean;
  customer: customerModel = new customerModel();

  @Output() customerEvent = new EventEmitter<customerModel>();

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
  }

  sendCustomer() {
    if ( this.customerExist ) {
      if (this.customer.maritalStatus === 'CASADO') {
        this.updateCustomerWithSpouse();
      } else {
        this.updateCustomerWithoutSpouse();
      }
    } else {
      if (this.customer.maritalStatus === 'CASADO') {
        this.saveCustomerWithSpouse();
      } else {
        this.saveCustomerWithoutSpouse();
      }
    }
    setTimeout(() => {
      this.customerEvent.emit(this.customer);
    }, 1000);
  }

  verifyMatriaslStatus() {
    if (this.customer.maritalStatus === 'CASADO') {
      return false;
    } else {
      this.customer.spouse = undefined;
      this.customer.spouseModel = new spouseModel();
      return true;
    }
  }

  updateCustomerWithSpouse() {
    this.api.tokenReturn().then((token) => {
      this.api.updateSpouse( this.customer.spouseModel._id, this.customer.spouseModel, token )
      .subscribe( resp => {
        this.customer.spouse = resp.spouseDB._id;
        setTimeout(() => {
          this.api.updateCustomer( this.customer._id, this.customer, token )
          .subscribe( resp1 => {
            this.customer = resp1.customerDB;
          });
        }, 500);
      });
    });
  }

  updateCustomerWithoutSpouse() {
    this.api.tokenReturn().then((token) => {
      this.api.updateCustomer( this.customer._id, this.customer, token )
      .subscribe( resp1 => {
        this.customer = resp1.customerDB;
      });
  });
  }

  saveCustomerWithSpouse() {
    this.api.tokenReturn().then((token) => {
      this.api.saveSpouse( this.customer.spouseModel, token )
      .subscribe( resp => {
        this.customer.spouse = resp.spouseDB._id;
        setTimeout(() => {
          this.api.saveCustomer( this.customer, token )
          .subscribe( resp1 => {
            this.customer = resp1.customerDB;
          });
        }, 500);
      });
    });
  }

  saveCustomerWithoutSpouse() {
    this.api.tokenReturn().then((token) => {
      this.api.saveCustomer( this.customer, token )
      .subscribe( resp1 => {
        this.customer = resp1.customerDB;
      });
  });
  }

  findCustomerByCI() {
    if ( this.customer.ci.length === 10 ) {
      this.api.tokenReturn().then((token) => {
        this.api.getCustomerByCI( this.customer.ci, token )
        .subscribe( resp => {
          // console.log(resp.customer);
          if ( resp.customer != null ) {
            this.customerExist = true;
            this.customer = resp.customer;
            this.customer.birthDate = resp.customer.birthDate.split('T')[0];
            if ( resp.customer.maritalStatus === 'CASADO' ) {
              this.customer.spouseModel = resp.customer.spouse;
              this.customer.spouseModel.birthDate = resp.customer.spouse.birthDate.split('T')[0];
            } else {
              this.customer.spouse = undefined;
              this.customer.spouseModel = new spouseModel();
            }
          } else {
            this.customerExist = false;
          }
        });
      });
    }
  }

}
