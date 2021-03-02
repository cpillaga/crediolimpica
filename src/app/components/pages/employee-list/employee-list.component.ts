import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { employeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listEmployee: employeeModel[] = [];
  employee: employeeModel = new employeeModel();
  constructor( private api: ApiService ) { }

  ngOnInit(): void {
    this.list();
  }


  list(){
    this.api.tokenReturn().then((token) => {
      this.api.getEmployee(token)
        .subscribe( resp =>  {
          this.listEmployee = resp;
        });
      });
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
}
