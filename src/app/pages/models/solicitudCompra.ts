import { Cliente } from "./cliente";
import { ItemSolicitud } from "./itemSolicitud";

export class SolicitudCompra {
    id: number;
    pedido: string;
    cantidad: number;
    fechaSolicitud: string;
    total: number;
    cliente: Cliente;
    items: ItemSolicitud[] =[];
    

}