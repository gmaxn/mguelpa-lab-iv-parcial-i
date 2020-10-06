import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { timer } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Identity } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private subscription: Subscription;
  public email:string = '';
  public password:string = '';
  public progreso:number;
  public progresoMensaje: string = "esperando...";
  public logeando:boolean = false;
  public ProgresoDeAncho: string;

  public clase:string = "progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore) {
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";

  }

  ngOnInit() {
  }

  signin(): void {

    this.authService.signIn({
      username:this.email,
      password:this.password
    }).then(res => {
      console.log('login exitoso', res);

      this.db.collection('log-usuarios').add({
        email: this.email,
        fecha: firestore.Timestamp.fromDate(new Date())

      }).then(docRef => {

          localStorage.setItem('user', JSON.stringify({
            email:this.email
          }));

          this.router.navigate(['account']);

          console.log('Document written with ID: ', docRef.id);

        }).catch(error => {

          console.error('Error adding document: ', error);

        });
    }).catch(error => {

      console.log('Login error: ', error);

      this.router.navigate(['error']);
    });

  }

  MoverBarraDeProgreso() {

    this.logeando = true;
    this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje = "NSA spy...";
    let myTimer = timer(200, 50);
    this.subscription = myTimer.subscribe(t => {


      console.log("inicio");
      this.progreso = this.progreso + 1;
      this.ProgresoDeAncho = this.progreso + 20 + "%";


      switch (this.progreso) {
        case 15:
          this.clase = "progress-bar progress-bar-warning progress-bar-striped active";
          this.progresoMensaje = "Verificando ADN...";
          break;
        case 30:
          this.clase = "progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje = "Adjustando encriptación..";
          break;
        case 60:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando Info del dispositivo..";
          break;
        case 75:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando claves facebook, gmail, chats..";
          break;
        case 85:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Instalando KeyLogger..";
          break;

        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.signin();
          break;
      }
    });
    //this.logeando=true;
  }

  onAutoComplete(): void {
    this.email = 'guest@user.com';
    this.password = '123456';
  }
  onClearInput(): void {
    this.email = '';
    this.password = '';
  }
}
