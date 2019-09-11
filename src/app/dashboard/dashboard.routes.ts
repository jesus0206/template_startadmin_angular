import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingresos-egreso/estadistica/estadistica.component';
import { IngresosEgresoComponent } from '../ingresos-egreso/ingresos-egreso.component';
import { DetalleComponent } from '../ingresos-egreso/detalle/detalle.component';



export const dashboardRoutes:Routes=[
  {path:'',component:EstadisticaComponent},
  {path:'ingreso-egreso',component:IngresosEgresoComponent},
  {path:'detalle',component:DetalleComponent}
]
