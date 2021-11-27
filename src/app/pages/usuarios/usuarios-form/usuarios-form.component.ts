import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'
import { FormatWidth } from '@angular/common';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  public usuario: Usuario = new Usuario()
  public titulo: string = "Crear Usuario"
  public errores: string[];
  roles: Role[];
  selectedRoles: any[];
  registerForm: FormGroup;



  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      roles: [this.roles]
    }),
      this.cargarRoles();


    // this.usuarioService
    //   .getRoles()
    //   .subscribe((data: any) => {
    //     this.roles = data;
    //     console.log(data);
    //   });
  }

  get nombreNotValid() {
    return this.registerForm.get('username').invalid && this.registerForm.get('username').touched;
  }
  get passwordNotValid() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }
  get emailNotValid() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }
  get rolesNotValid() {
    return this.registerForm.get('roles').invalid && this.registerForm.get('roles').touched;
  }



  get data() { return this.registerForm.value; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const selectedRoles = this.registerForm.value.roles
      .map((v, i) => {
        return v ? this.roles[i] as Role : null;
      })
      .filter(v => v !== null);

    console.log("rol seleccionado:", selectedRoles)

    this.usuario = new Usuario();
    this.usuario = this.data;
    
    console.log("Data: ", this.data);
    this.usuario.roles = selectedRoles;

    this.create();


  }


  cargarRoles() {
    this.usuarioService
      .getRoles()
      .subscribe((data: any) => {
        this.roles = data;
        console.log(data);
      });


  }

  create(): void {
    // const rols = new FormArray([this.roles.forEach( x =>  new FormControl())])
    // console.log(this.selectedRoles);
    console.log(this.usuario);
    console.log(this.roles);
    this.usuarioService.create(this.usuario)
      .subscribe(
        usuario => {
          this.router.navigate(['/usuarios']);
          swal.fire('Nuevo cliente', `El cliente ${usuario.username} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

}
