import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IUser } from '../models/user';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: AngularFirestoreCollection<IUser>;
  private user: AngularFirestoreCollection<IUser>;

  constructor(private db: AngularFirestore) {

    this.users = this.db.collection('users');


  }


  getAllUsers(): Observable<IUser[]> {

    return this.users.valueChanges().pipe(

      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUserByEmail(email: string): Observable<IUser> {

    const filtered = this.db.collection<IUser>('users', ref => ref.where('email','==', email).limit(1));
    
    return filtered.valueChanges().pipe(
      flatMap(result => result),
      catchError(this.handleError)
    );
  }  

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console.
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

