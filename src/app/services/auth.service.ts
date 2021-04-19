import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(public afAuth:AngularFireAuth) { }

  getAuth():Observable<any>{
    return this.afAuth.authState
  }

  login(email: string, password:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      // angular fire dropped support for the auth object
      this.afAuth.signInWithEmailAndPassword(email, password).then(userData=>{
        resolve(userData)},
      err=>{
        return reject(err)
      })
    })
  }

  logout(){
    this.afAuth.signOut();
  }

  register(email: string, password:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      // angular fire dropped support for the auth object
      this.afAuth.createUserWithEmailAndPassword(email, password).then(userData=>{
        resolve(userData)},
      err=>{
        return reject(err)
      })
    })
  }
}
