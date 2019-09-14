export class IngresoEgreso {
  descripcion: string;
  monto: string;
  tipo: string;
  uid?: string;

  constructor(obj: IIngresoEgreso) {
    this.descripcion = obj.descripcion;
    this.monto = obj.monto;
    this.tipo = obj.tipo;
  }

}

export interface IIngresoEgreso {
  descripcion: string;
  monto: string;
  tipo: string;
  uid: string;
}
