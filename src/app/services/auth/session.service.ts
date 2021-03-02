import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements CanActivate{
//in
  constructor( private route: Router,
               private api: ApiService ) { }

               getSession() {
                return new Promise((res, err) => {
                  this.api.tokenReturn().then((token) => {
                    if (token === 400) {
                      res(false);
                    } else {
                      res(true);
                    }
                  });
                });
              }
              async canActivate() {
                const respuesta = await this.getSession();
                console.log(respuesta);
                if (respuesta) {
                  return true;
                } else {
                  this.route.navigate(['/login']);
                  return false;
                }
              }
}
