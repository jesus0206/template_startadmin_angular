import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingresos-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string
  subcripcion: Subscription = new Subscription()

  constructor(private authService: AuthService, private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subcripcion = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(data => this.nombre = data.user.nombre)
  }
  ngOnDestroy() {
    this.subcripcion.unsubscribe()
  }
  logout() {
    this.authService.logout()
    this.ingresoEgresoService.cancelarSubcripcion()
  }

}
