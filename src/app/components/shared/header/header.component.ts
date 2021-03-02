import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// declare function init_plugins();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(  private router: Router) { }

  ngOnInit(): void {
    // init_plugins();
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

}
