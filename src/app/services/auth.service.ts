import { Injectable } from '@angular/core';
import { Identity } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  public async signIn(user: Identity) {
    return this.afAuth.signInWithEmailAndPassword(user.username, user.password);
  }

  public async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/home']);
  }

  public async register(user: Identity) {
    return this.afAuth.createUserWithEmailAndPassword(user.username, user.password);
  }
}