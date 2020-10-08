import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { FirebaseStorageService } from './../../services/firebase-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { firestore } from 'firebase';


@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent implements OnInit {

  public errorMessage: string;

  public id: number;
  public name: string;
  public genre: string;
  public releaseDate: Date;
  public crowdQty: number;
  public imageUrl: string = '';

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
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.onSelectShowImgName();
  }

  async onSubmit() {

    this.movieService.form.value.name = this.name;
    this.movieService.form.value.genre = this.genre;
    this.movieService.form.value.releaseDate = this.releaseDate;
    this.movieService.form.value.crowdQty = this.crowdQty;
    this.movieService.form.value.imageUrl = '';

    let archivo = this.datosFormulario.get('archivo');
    let data = this.movieService.form.value;

    if (archivo) {
      // The storage path
      const fileName = `movies/${Date.now()}_${this.nombreArchivo}`;
      this.firebaseStorage.uploadFile(fileName, archivo)
      .then(url => { 

        data.imageUrl = url;

        this.movieService.createMovie(data).then(res => { });

        this.router.navigate(['/busqueda']);

       });
    }
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
