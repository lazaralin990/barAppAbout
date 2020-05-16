import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {

  }

  canActivate() {
    if (auth().currentUser) {
      return true;
      } else {
        this.router.navigate[('/home')];
        return false;
      }
    }

}
