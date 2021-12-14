import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false;
  
    }

    let roles = next.data['role'] as string[];
    console.log(roles);

    // if (this.authService.hasRole(role)) {
    //   return true;
    // }
    let hasRole = false;
    roles.forEach(role => {
        if (this.authService.hasRole(role)) {
           hasRole =  true;
        }
    });
    if(hasRole){return true}

    swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning')
    this.router.navigate(['/login'])
    return false;
  }
}
