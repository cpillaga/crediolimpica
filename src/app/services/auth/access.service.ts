import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  ///out
  constructor(  private route: Router,
                private api: ApiService ) { }
  
                getSession() {
                  return new Promise((res, err) => {
                    this.api.tokenReturn().then((token) => {
                      if (token === 400) {
                        res(true);
                      } else {
                        res(false);
                      }
                    });
                  });
                }
              
                async canActivate() {
                  const respuesta = await this.getSession();
                  if (respuesta) {
                    return false;
                  } else {
                    this.route.navigate(['/home']);
                    return true;
                  }
                }

}
