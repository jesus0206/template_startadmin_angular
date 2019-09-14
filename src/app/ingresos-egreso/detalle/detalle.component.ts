import { IngresoEgreso } from './../ingreso.egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[]
  subcripcion: Subscription = new Subscription()

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subcripcion = this.store.select('ingresoEgreso')
      .subscribe(data => {
        this.items = data.items
      })
  }

  borrarItem(item) {;
    this.ingresoEgresoService.borrarEgresoIngreso(item.uid)
      .then(() => {
        Swal.fire({ title: 'Borrado', text: item.description, type: 'success' })
      })
  }
  ngOnDestroy() {
    this.subcripcion.unsubscribe()
  }
}
