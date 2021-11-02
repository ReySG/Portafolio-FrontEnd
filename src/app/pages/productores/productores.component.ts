import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalService } from '../clientes/modal.service';
import { Productor } from '../models/productor';
import { ProductorService } from './productor.service';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.css']
})
export class ProductoresComponent implements OnInit {

  loading: boolean = false;
  paginador: any;
  productores: Productor[];

  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute,
    private productorService: ProductorService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productorService.getProductores(page)
        .subscribe(response => {
          this.productores = response.content as Productor[];
          this.paginador = response;
        });
        console.log(this.productores);
    });

  }

  ejecutar() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000)
  }

  abrirModal() {
    this.modalService.abrirModal();
  }

}
