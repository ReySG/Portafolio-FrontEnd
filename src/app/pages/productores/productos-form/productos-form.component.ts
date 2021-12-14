import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from './producto.service';
import swal from 'sweetalert2';
import { SolicitudCompra } from '../../models/solicitudCompra';
import { SolicitudService } from '../../solicitud/solicitud.service';


@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  public producto: Producto = new Producto();
  public errores: string[];
  productoForm: FormGroup;
  solicitud: SolicitudCompra;

  constructor(private formBuilder: FormBuilder, private solicitudService: SolicitudService, private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.solicitudService.getSolicitud(id).subscribe(solicitud => this.solicitud = solicitud);
        console.log("Solicitud: ", this.solicitud);
      }
    })

  }

  update(): void{
    this.solicitudService.agregarProducto(this.solicitud)
    .subscribe( json => {
      this.router.navigate(['/agregar-producto'])
      swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }

  // create() {
  //   console.log("producto creado", this.producto);
  //   this.productoService.crearProducto(this.producto)
  //     .subscribe(
  //       productor => {
  //         this.router.navigate(['/productores']);
  //         swal.fire('Nuevo Producto Agregado', `Producto ${productor.nombre} ha sido creado con éxito`, 'success');
  //       },
  //       err => {
  //         this.errores = err.error.errors as string[];
  //         console.error('Código del error desde el backend: ' + err.status);
  //         console.error(err.error.errors);
  //       }
  //     );
  // }

  
}


// onSubmit() {
//   if (this.productoForm.invalid) {
//     return Object.values(this.productoForm.controls).forEach(control => {
//       control.markAsTouched();
//     });
//   }
//   this.producto = new Producto();
//   this.producto = this.data;
//   this.create();

// }
          // get nombreNotValid() {
          //   return this.productoForm.get('nombre').invalid && this.productoForm.get('nombre').touched;
          // }
          // get pesoNotValid() {
          //   return this.productoForm.get('peso').invalid && this.productoForm.get('peso').touched;
          // }
          // get precioNotValid() {
          //   return this.productoForm.get('precio').invalid && this.productoForm.get('precio').touched;
          // }

          // get data() { return this.productoForm.value; }