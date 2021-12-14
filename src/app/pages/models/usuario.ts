import { Cliente } from "./cliente";
import { Productor } from "./productor";

export class Usuario {
    id: number;
    username: string;
    password: string
    email: string;
    roles: string[] = [];
    cliente: Cliente;
    productor: Productor;

}
