import { IngresoEgreso } from './../ingreso.egreso.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  contarIngresos: number;
  contarEgresos: number;
  subcription: Subscription = new Subscription()

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subcription = this.store.select('ingresoEgreso').subscribe(data => {
      this.contarIngresosEgresos(data.items)
    })
  }

  contarIngresosEgresos(items: IngresoEgreso[]) {
    this.ingresos = 0
    this.egresos = 0
    this.contarEgresos = 0
    this.contarIngresos = 0

    items.forEach(item => {
      if (item.tipo == 'ingreso') {
        this.contarIngresos++
        this.ingresos += Number(item.monto)
      } else {
        this.contarEgresos++;
        this.egresos += Number(item.monto)
      }
    })
    this.doughnutChartData = [this.ingresos, this.egresos]
  }
}
