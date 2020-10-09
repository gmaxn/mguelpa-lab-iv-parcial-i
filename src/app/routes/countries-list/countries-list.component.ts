import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICountry, ICurrencies } from './../../models/country'
import { CountriesService } from './../../services/countries.service'
@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {
  
  @Output() notifyCountry2: EventEmitter<ICountry> = new EventEmitter<ICountry>();


  maxPopulation: number;
  minPopulation: number;
  regions: Array<string>;

  imageWidth: number = 100;
  imageMargin: number = 5;
  showImage: boolean = false;
  errorMessage: string;
  showGrid: boolean = false;
  showDetail: boolean = false;
  country: ICountry;

  _filterTerm: string;

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filteredCountries = this.filterTerm ? this.performFilter(this._filterTerm) : this.countries;
  }

  filteredCountries: ICountry[];
  countries: ICountry[];

  constructor(private countriesService: CountriesService) {
  }
  
  ngOnInit(): void {
    this.countriesService.getProducts().subscribe({
      next: countries => { 
        this.countries = countries;
        this.filteredCountries = this.countries;
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

  performFilter(filterBy: string): ICountry[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries.filter((country: ICountry) =>
    country.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onReceiveCountry(country: ICountry): void {

    this.notifyCountry2.emit(country);
    this.country = country;
    this.showGrid = false;
    this.showDetail = true;
    console.log(this.showDetail);
  }
  
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
