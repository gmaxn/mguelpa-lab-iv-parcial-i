import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICountry } from './../../../models/country';

@Component({
  selector: 'app-countries-gird',
  templateUrl: './countries-gird.component.html',
  styleUrls: ['./countries-gird.component.css']
})
export class CountriesGirdComponent implements OnInit {

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
    this.filteredCountries = this.filterTerm ? this.performFilter(this._filterTerm) : this.countries;
  }

  @Input() filteredCountries: ICountry[];
  @Input() countries: ICountry[];
  @Input() maxPopulation: number;
  @Input() minPopulation: number;
  @Input() regions: Array<string>;

  @Output() selectedCountry: ICountry;

  @Output() notifyCountry: EventEmitter<ICountry> = new EventEmitter<ICountry>();

  constructor() {  
  }
  
  ngOnInit(): void {
    this.filteredCountries = this.countries;
    this.filterByRangeAndRegions();
  }

  onSendCountry(country: ICountry): void {
    this.notifyCountry.emit(country);
  }

  getCountry(countryName: string): ICountry {
    return this.filteredCountries.filter((c: ICountry) => c.name === countryName)[0];
  }

  performFilter(filterBy: string): ICountry[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.countries
    .filter((country: ICountry) =>
    country.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public filterByRangeAndRegions():void {

    let result = this.countries;
    
    if(this.minPopulation > 0 || this.maxPopulation > this.minPopulation) {

      result = this.countries.filter((c: ICountry) => (c.population <= this.maxPopulation && c.population >= this.minPopulation));
    }
    if(this.regions) {
      result = result.filter((c: ICountry) => {
        for(let i=0; i<this.regions.length; i++){
          if(c.region === this.regions[i]) {
            return c;
          }
        }
      });
    }
    this.filteredCountries = result;
    this.countries = result;
  }
}
