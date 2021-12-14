import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SolicitudCompra } from '../models/solicitudCompra';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint: string = 'http://localhost:8034/api/solicitud-compra';
  private urlAgregarProducto: string = 'http://localhost:8034/api/agregar-producto';


  constructor(private http: HttpClient, private router: Router) { }

  getSolicitudes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
  }
  
  getSolicitudesCliente(id: number, page:number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/' + id + '/page/' + page);
  }

  getSolicitud(id): Observable<SolicitudCompra> {
    return this.http.get<SolicitudCompra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/agregar-producto']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  agregarProducto(solicitud: SolicitudCompra): Observable<any> {
    return this.http.put<any>(`${this.urlAgregarProducto}/${solicitud.id}`, solicitud).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/agregar-producto']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  // getSolicitudCliente(idCliente): Observable<SolicitudCompra> {
  //   return this.http.get<SolicitudCompra>(`${this.urlEndPoint}/${idCliente}`).pipe(
  //     catchError(e => {
  //       if (e.status != 401 && e.error.mensaje) {
  //         this.router.navigate(['/perfil']);
  //         console.log(e.error.mensaje);
  //       }
  //       return throwError(e);
  //     })
  //   );
  // }

  crearSolicitudCompra(solicitudCompra: SolicitudCompra): Observable<any> {
    return this.http.post(this.urlEndPoint, solicitudCompra,).pipe(
      map((response: any) => response.productor as SolicitudCompra),
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

  getProductor(id): Observable<SolicitudCompra> {
    return this.http.get<SolicitudCompra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/perfil']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
