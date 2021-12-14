import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../../models/producto';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8034/api/producto';

  constructor(private http: HttpClient, private router: Router) { }

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
  }

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(this.urlEndPoint, producto,).pipe(
      map((response: any) => response.productor as Producto),
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

  getProductosPorId(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/productores']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
