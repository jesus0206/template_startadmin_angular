import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string
  subcripcion: Subscription = new Subscription()
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subcripcion = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(data => {
        this.nombre = data.user.nombre
      })
  }

  ngOnDestroy() {
    this.subcripcion.unsubscribe()
  }
}
