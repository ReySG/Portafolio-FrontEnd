import { SolicitudCompra } from "./solicitudCompra";
import { Usuario } from "./usuario";

export class Cliente {
    idCliente: number;
    rut: string;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    email: string;
    direccion: string;
    numero: number;
    empresa: string;
    usuario: Usuario;
    solicitudes: SolicitudCompra[] = [];


}



