import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../models/role';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlEndPoint: string = 'http://localhost:8034/api/usuarios';
  private urlEndPointRoles:string = 'http://localhost:8034/api/roles'



  constructor(private http: HttpClient, private router: Router) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlEndPointRoles);
  }
  
  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Usuario[]).forEach(usuario => {
        })
      }),
      map((response: any) => {
        (response.content as Usuario[]).map(usuario => {
          usuario.username = usuario.username.toUpperCase();
          return usuario;
        });
        return response;
      }),
      tap(response => {
        (response.content as Usuario[]).forEach(usuario => {

        }
        )
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/usuarios']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  create(usuario:Usuario) : Observable<Usuario>{
    return this.http.post(this.urlEndPoint,usuario, ).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        if (e.status == 400){
          return throwError(e)
        }
        if(e.error.mensaje){
        console.error(e.error.mensaje);
       }
        return throwError(e);
      })
    );
  }


  update(usuario: Usuario): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
      catchError(e => {
        if (e.status == 400){
          return throwError(e)
        }
        if(e.error.mensaje){
        console.error(e.error.mensaje);
       }
        return throwError(e);
      })
    );
  }

}
