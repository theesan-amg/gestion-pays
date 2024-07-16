import { Component } from '@angular/core';
import {CountryService} from "./service/country.service";
import {Country} from "./model/country.model";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-pays'
  filteredCountries: Country[] = [];
  allCountries: Country[] = [];
  showBody = true; // Flag to control visibility of <app-body>


  constructor(private countryService : CountryService ,private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Change visibility based on the route
        this.showBody = !this.router.url.startsWith('/country');
      }
    });
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
