import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {


  maxPopulation: number;
  minPopulation: number;
  regions: Array<string>;

  imageWidth: number = 100;
  imageMargin: number = 5;
  showImage: boolean = false;
  errorMessage: string;
  showGrid: boolean = false;
  showDetail: boolean = false;
  movie: IMovie;

  _filterTerm: string;

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filteredMovies = this.filterTerm ? this.performFilter(this._filterTerm) : this.movies;
  }

  filteredMovies: IMovie[];
  movies: IMovie[];

  constructor(private movieService: MovieService) {
  }
  
  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: movies => { 
        this.movies = movies;
        this.filteredMovies = this.movies;
      }, 
      error: err => this.errorMessage = err
    });
  }

  onNotify(message: string): void {
    this.filterTerm = message;
  }

  onShowGrid(): void {
    this.showGrid = !this.showGrid;
    this.showDetail = false;
  }
  
  onReceiveRegions(regions: Array<string>):void {
    this.regions = regions;
  }
  onReceiveRange(minMax: number[]): void {
    this.minPopulation = minMax[0];
    this.maxPopulation = minMax[1];
  }

  performFilter(filterBy: string): IMovie[] {
    console.log(filterBy);
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
    movie.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onReceiveCountry(movie: IMovie): void {
    this.movie = movie;
    this.showGrid = false;
    this.showDetail = true;
    console.log(this.showDetail);
  }
  
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
