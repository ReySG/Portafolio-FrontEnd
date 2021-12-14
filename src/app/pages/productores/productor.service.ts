import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Productor } from '../models/productor';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  private urlEndPoint: string = 'http://localhost:8034/api/productores';


  constructor(private http: HttpClient, private router: Router) { }


  getProductores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
  }

  delete(id: number): Observable<Productor> {
    return this.http.delete<Productor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getProductor(id): Observable<Productor> {
    return this.http.get<Productor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/perfil']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  create(productor: Productor): Observable<Productor> {
    return this.http.post(this.urlEndPoint, productor,).pipe(
      map((response: any) => response.productor as Productor),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  update(productor: Productor): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${productor.idProductor}`, productor).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


}
