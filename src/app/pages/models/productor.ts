import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Productor {
    idProductor: number;
    rut: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    direccion: string;
    numero: number;
    createAt: string;
    productos: Producto[] = [];
    usuario: Usuario;


}