export interface Event {
  id: number;
  nombre: string;
  descripcion: string;
  fechaEvento: string;
  horaEvento: string;
  precioEntrada: number;
  aforoMaximo: number;
  entradasDisponibles: number;
  cancelado: boolean;
  presencial: boolean;
  categoria: string;
}