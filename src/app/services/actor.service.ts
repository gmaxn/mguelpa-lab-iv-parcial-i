import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IActor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  

  public form = new FormGroup({
    firstname: new FormControl(""),
    lastname:  new FormControl(""),
    gender: new FormControl(""),
    birdDate: new FormControl(""),
    country:  new FormControl(""),
    imageUrl:  new FormControl("")
  });

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) { }

  createMovie(data: FormData) {

    return new Promise<any>((resolve, reject) => {
      this.db
        .collection("actors")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  getMovies() {
    return this.db.collection<IActor>("actors").valueChanges().pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
