import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate() {
    if (localStorage.getItem('loggedInUser') ==="null") {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
