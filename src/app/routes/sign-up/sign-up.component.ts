import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public age: number;
  public gender: string = 'Genero';

  public user: IUser;

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onRegister(): void {

    this.authService.register({
      username: this.email,
      password: this.password
    })
    .then(res => {

      console.log('login exitoso', res);

      this.db.collection('users').add({
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        age: this.age,
        gender: this.gender
      })
      .then(docRef => {

        localStorage.setItem('user', JSON.stringify({email:this.email}));
        this.router.navigate(['/account']);

        console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {

        this.router.navigate(['error']);

        console.error('Error adding document: ', error);
      });

    }).catch(error => {
      this.router.navigate(['error']);
      
      console.log('Login error: ', error);
    });
  }
}
