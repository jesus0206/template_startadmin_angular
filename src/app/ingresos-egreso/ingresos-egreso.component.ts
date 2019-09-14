import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso.egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
  selector: 'app-ingresos-egreso',
  templateUrl: './ingresos-egreso.component.html',
  styles: []
})
export class IngresosEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup
  tipo: string = 'ingreso'
  locadingSubcription: Subscription = new Subscription()
  cargando: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.locadingSubcription = this.store.select('ui').subscribe(data => this.cargando = data.isLoading)

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })
  }

  ngOnDestroy() {
    this.locadingSubcription.unsubscribe()
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo })

    this.store.dispatch(new ActivarLoadingAction())

    this.ingresoEgresoService.crearIngreoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction())
        Swal.fire({
          title: 'Creado',
          text: ingresoEgreso.descripcion,
          type: 'success'
        });

        this.forma.reset({
          monto: 0
        })

      }).catch(err => {

      })
    this.forma.reset({
      monto: 0
    })
  }
}
