import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean
  subcripcion: Subscription

  constructor(public authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    console.log('ngOnInit')
    this.subcripcion = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }

  ngOnDestroy() {
    this.subcripcion.unsubscribe()
  }

  login(data: any) {
    this.authService.login(data.email, data.password);
  }

}
