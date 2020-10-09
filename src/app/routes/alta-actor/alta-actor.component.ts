import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { FirebaseStorageService } from './../../services/firebase-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorService } from 'src/app/services/actor.service';
import { firestore } from 'firebase';
import { ICountry } from 'src/app/models/country';
@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.css']
})
export class AltaActorComponent implements OnInit {


  public errorMessage: string;

  public id: string;
  public firstname: string;
  public lastname: string;
  public gender: string;
  public birthDate: Date;
  public country: string;
  public imageUrl: string = '';

  selectedCountry: ICountry = {
    name:"",
    topLevelDomain: null,
    alpha2Code: "",
    alpha3Code: "",
    callingCodes: null,
    capital:"",
    altSpelling:"",
    region:"",
    subregion:"",
    population:0,
    latlng:null,
    demonym:"",
    area:0,
    gini:0,
    timezones:null,
    borders:null,
    nativeName:null,
    numericCode: 1,
    currencies: null,
    flag:""  
  };



  // File Upload
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public nombreArchivo = '';

  public datosFormulario = new FormData();

  public fileName = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });


  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseStorage: FirebaseStorageService,
    private db: AngularFirestore,
    private actorService: ActorService) { }

  ngOnInit(): void {
    this.onSelectShowImgName();
  }

  async onSubmit() {

    this.actorService.form.value.firstname = this.firstname
    this.actorService.form.value.lastname = this.lastname
    this.actorService.form.value.gender = this.gender
    this.actorService.form.value.birdDate = this.birthDate
    this.actorService.form.value.country = this.selectedCountry.name
    this.actorService.form.value.imageUrl = this.imageUrl;

    let archivo = this.datosFormulario.get('archivo');
    let data = this.actorService.form.value;

    if (archivo) {
      // The storage path
      const fileName = `actor/${Date.now()}_${this.nombreArchivo}`;
      this.firebaseStorage.uploadFile(fileName, archivo)
      .then(url => { 

        data.imageUrl = url;

        this.actorService.createMovie(data).then(res => { });

        this.router.navigate(['/busqueda']);

       });
    }
  }

  onReceiveCountry(country: ICountry): void {
    this.selectedCountry = country;
    console.log(country);
  }

  onSelectShowImgName(): void {
    $(".custom-file-input").on("change", function () {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
  }

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

}
