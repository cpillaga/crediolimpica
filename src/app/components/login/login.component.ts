import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(  private router: Router,
    private api: ApiService
 ) { }

ngOnInit(): void {
  init_plugins();
}

login(auth1: NgForm){
// console.log(auth1.value)
this.api.postlogin(auth1.value).subscribe(( data:any ) =>{

  localStorage.setItem('token', JSON.stringify(data.token));
  localStorage.setItem('employee_id', JSON.stringify(data.user._id));
  this.alertSuccess();
  this.router.navigate(['/home']);

  },( err: any )=>{
      this.alertError();
  });

}

alertError(){
Swal.fire({
icon: 'error',
title: 'Oooops.. Usuario no Registrado',
showClass: {
popup: 'animated fadeInDown faster'
},
hideClass: {
popup: 'animated fadeOutUp faster'
}
})
}
alertSuccess(){
Swal.fire({
icon: 'success',
title: 'Bienvenido',
showConfirmButton: false,
timer: 700
})
}

}
