import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresosEgresoComponent } from './ingresos-egreso.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresosEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
  ]
})
export class IngresosEgresoModule { }
