import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from "rxjs/operators"
import { User, IUser } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { Subscription } from 'rxjs';
import { SetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription()

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((obj: IUser) => {
            const newUser = new User(obj);
            this.store.dispatch(new SetUserAction(newUser))
            console.log(obj);
          })
      } else {
        this.userSubscription.unsubscribe()
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction())
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {

        const user: User = {
          uid: data.user.uid,
          nombre: nombre,
          email: data.user.email
        }
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.route.navigate(["/"])
            this.store.dispatch(new DesactivarLoadingAction())
          })
      }).catch(err => {
        this.store.dispatch(new DesactivarLoadingAction())
        Swal.fire({
          title: 'Error!',
          text: err.message,
          type: 'error',
        })
      })

  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction())
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        this.route.navigate(["/"])
        this.store.dispatch(new DesactivarLoadingAction())
      }).catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          type: 'error',
        })
        this.store.dispatch(new DesactivarLoadingAction())
      })
  }

  logout() {
    this.afAuth.auth.signOut()
    this.route.navigate(['login'])
  }
  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbuser => {
          if (fbuser == null) {
            this.route.navigate(["login"])
          }
          return fbuser != null
        })
      )
  }
}
