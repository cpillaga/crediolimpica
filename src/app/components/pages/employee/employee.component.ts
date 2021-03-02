import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../../../models/employee.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: employeeModel = new employeeModel();
  listEmployee: employeeModel[] = [];
  constructor( private api: ApiService) { }

  ngOnInit(): void {
  }

  saveEmployee(){
    this.api.tokenReturn().then((token) => {
      this.api.saveEmployee( this.employee, token )
      .subscribe( resp => {
        console.log(resp);
      });
    });
  }

  clean(){
    this.employee = new employeeModel();
  }

  list(){
    this.api.tokenReturn().then((token) => {
      this.api.getEmployee(token)
        .subscribe( resp =>  {
          this.listEmployee = resp;
        });
      });
  }

}
