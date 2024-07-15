import { Component } from '@angular/core';
import {CountryService} from "./service/country.service";
import {Country} from "./model/country.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-pays'
  filteredCountries: Country[] = [];
  allCountries: Country[] = [];

  constructor(private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.allCountries = this.countryService.getCountries();
    this.filteredCountries = this.allCountries;
  }

  onSearch(term: string): void {
    if (term) {
      this.filteredCountries = this.countryService.searchCountries(term);
    } else {
      this.filteredCountries = this.allCountries;
    }
  }

  addCountry(country: Country): void {
    this.countryService.addCountry(country);
    this.allCountries = this.countryService.getCountries(); // Update allCountries
    this.filteredCountries = this.allCountries; // Reset filtered countries
  }
}
