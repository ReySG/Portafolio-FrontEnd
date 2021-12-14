import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Productor } from '../../models/productor';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { ProductorService } from '../productor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productores-info-update',
  templateUrl: './productores-info-update.component.html',
  styleUrls: ['./productores-info-update.component.css']
})
export class ProductoresInfoUpdateComponent implements OnInit {

  public usuario: any;
  public productor: Productor = new Productor();
  public productorActual: Productor;
  idUsuario: number;
  progreso: number = 0;
  seleccionados: any[];
  errores: string[];
  productorForm: FormGroup;


  constructor(private productorService: ProductorService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private usuarioService: UsuariosService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.usuario);
    this.idUsuario = this.authService.usuario.id;
    this.usuarioService.getUsuario(this.idUsuario).subscribe(user => this.usuario = user);
    console.log("idUSuario:", this.idUsuario);

    console.log(this.usuario);
    this.productorForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      usuarioId: this.idUsuario
    })
  }

  get nombreNotValid() {
    return this.productorForm.get('nombre').invalid && this.productorForm.get('nombre').touched;
  }
  get rutNotValid() {
    return this.productorForm.get('rut').invalid && this.productorForm.get('rut').touched;
  }
  get apellidoPNotValid() {
    return this.productorForm.get('apellidoPaterno').invalid && this.productorForm.get('apellidoPaterno').touched;
  }
  get apellidoMNotValid() {
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

  onSubmit() {
    if (this.productorForm.invalid) {
      return Object.values(this.productorForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this.update();

  }


  cargarProductor(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.productorService.getProductor(id).subscribe((productor) => this.productorActual = productor
        )
      }
    })

  }

  update(): void {
    this.usuario.productor = this.data;
    this.usuarioService.updateProductor(this.usuario)
      .subscribe(json => {
        this.router.navigate(['/producto/form'])
        Swal.fire('Cliente Productor Actualizado', `El productor ha sido actualizado exitosamente`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
