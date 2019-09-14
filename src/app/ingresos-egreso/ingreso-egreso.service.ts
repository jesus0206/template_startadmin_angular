import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso.egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators'
import { SetItemsAction,UnsetItemsAction } from './ingreso-egreso-actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription = new Subscription()
  ingresoEgresoitemsSubcription: Subscription = new Subscription()
  constructor(
    private aFDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListenner() {
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.ingresosEgresosItems(auth.user.uid))
  }

  private ingresosEgresosItems(uid: string) {
    this.ingresoEgresoitemsSubcription =
      this.aFDB.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe(
          map(docData => {

            return docData.map(doc => {
              return {
                ...doc.payload.doc.data(),
                uid: doc.payload.doc.id,
              };
            });

          })
        )
        .subscribe((data: any[]) => {
          this.store.dispatch(new SetItemsAction(data))
        })
  }

  borrarEgresoIngreso(uid: string) {
    const user = this.authService.getUsuario()
    return this.aFDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete()

  }
  cancelarSubcripcion() {
    this.ingresoEgresoListenerSubcription.unsubscribe()
    this.ingresoEgresoitemsSubcription.unsubscribe()
    this.store.dispatch(new UnsetItemsAction())
  }

  crearIngreoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario()

    return this.aFDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso })
  }


}
