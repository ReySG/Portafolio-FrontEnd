import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productor } from '../../models/productor';
import { ProductorService } from '../productor.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productores-form',
  templateUrl: './productores-form.component.html',
  styleUrls: ['./productores-form.component.css']
})
export class ProductoresFormComponent implements OnInit {

  public productor: Productor = new Productor()
  public errores: string[];
  productorForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private productorService: ProductorService, private router: Router) { }

  ngOnInit() {
    this.productorForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(9)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: ['', [Validators.required, Validators.minLength(9)]],
      numero: ['', [Validators.required, Validators.minLength(9)]],
    })
  }

  get nombreNotValid() {
    return this.productorForm.get('nombre').invalid && this.productorForm.get('nombre').touched;
  }
  get apellidoPaternoNotValid() {
    return this.productorForm.get('apellidoPaterno').invalid && this.productorForm.get('apellidoPaterno').touched;
  }
  get apellidoMaternoNotValid() {
    return this.productorForm.get('apellidoMaterno').invalid && this.productorForm.get('apellidoMaterno').touched;
  }
  get emailNotValid() {
    return this.productorForm.get('email').invalid && this.productorForm.get('email').touched;
  }
  get direccionNotValid() {
    return this.productorForm.get('direccion').invalid && this.productorForm.get('direccion').touched;
  }
  get numeroNotValid() {
    return this.productorForm.get('numero').invalid && this.productorForm.get('numero').touched;
  }

  get data() { return this.productorForm.value; }


  create() {
    console.log("productor creado", this.productor);
    this.productorService.create(this.productor)
      .subscribe(
        productor => {
          this.router.navigate(['/productores']);
          swal.fire('Nuevo cliente', `El productor ${productor.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  onSubmit() {
    if (this.productorForm.invalid) {
      return Object.values(this.productorForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this.productor = new Productor();
    this.productor = this.data;
    this.create();

  }

}
