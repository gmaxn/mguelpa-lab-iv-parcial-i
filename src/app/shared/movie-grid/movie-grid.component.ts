import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { IMovie } from '../../models/movie';


@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

  imageWidth: number = 100;
  imageMargin: number = 5;

  showImage: boolean = false;
  errorMessage: string;

  _filterTerm: string;

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filteredMovies = this.filterTerm ? this.performFilter(this._filterTerm) : this.movies;
  }

  @Input() filteredMovies: IMovie[];
  @Input() movies: IMovie[];
  @Input() maxPopulation: number;
  @Input() minPopulation: number;
  @Input() regions: Array<string>;

  @Output() notifyMovies: EventEmitter<IMovie> = new EventEmitter<IMovie>();

  constructor(movieService: MovieService) {  
  }
  
  ngOnInit(): void {
    this.filteredMovies = this.movies;
    this.filterByRangeAndRegions();
  }

  onSendMovies(movies: IMovie): void {
    this.notifyMovies.emit(movies);
  }

  getCountry(movieName: string): IMovie {
    return this.filteredMovies.filter((m: IMovie) => m.name === movieName)[0];
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies
    .filter((movies: IMovie) =>
    movies.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public filterByRangeAndRegions():void {

    let result = this.movies;
    
    if(this.minPopulation > 0 || this.maxPopulation > this.minPopulation) {

      result = this.movies.filter((m: IMovie) => (m.crowdQty <= this.maxPopulation && m.crowdQty >= this.minPopulation));
    }
    if(this.regions) {
      result = result.filter((m: IMovie) => {
        for(let i=0; i<this.regions.length; i++){
          if(m.name === this.regions[i]) {
            return m;
          }
        }
      });
    }
    this.filteredMovies = result;
    this.movies = result;
  }
}
