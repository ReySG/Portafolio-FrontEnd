import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Productor } from '../models/productor';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  private urlEndPoint: string = 'http://localhost:8034/api/productores';


  constructor(private http: HttpClient, private router: Router) { }


  getProductores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Productor[]).forEach(productor => {
        })
      }),
      map((response: any) => {
        (response.content as Productor[]).map(productor => {
          productor.nombre = productor.nombre.toUpperCase();
          return productor;
        });
        return response;
      }),
      tap(response => {
        (response.content as Productor[]).forEach(usuario => {

        }
        )
      })
    );
  }



}
