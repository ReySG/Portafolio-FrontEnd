import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../clientes/modal.service';
import { Role } from '../../models/role';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.css']
})
export class UsuariosDetailComponent implements OnInit {

  @Input() usuario: Usuario;
  progreso: number = 0;
  seleccionados: string[] = [];
  roles: Role[];

  constructor(public modalService: ModalService, private activatedRoute: ActivatedRoute,
    private usuarioService: UsuariosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioService
      .getRoles()
      .subscribe((data: any) => {
        this.roles = data;
      });
      this.usuario.roles.map((role) => {
        this.seleccionados.push(role);
      })
  }

  onSubmit() {


  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
    console.log("Usuario seleccionado: ", this.usuario);
    console.log("rol seleccionado: ", this.seleccionados);


  }

  compararRole(o1: Role, o2: Role): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
