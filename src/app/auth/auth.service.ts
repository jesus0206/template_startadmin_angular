import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from "rxjs/operators"
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private route: Router, private afDB: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser)
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {

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
          })
      }).catch(err => {
        console.log(err)
      })

  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        this.route.navigate(["/"])
      }).catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          type: 'error',
        })
        console.log(err);
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
