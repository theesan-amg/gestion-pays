import { Injectable } from '@angular/core';
import {Country} from "../model/country.model";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = [];

  constructor() {
    // Ajoutez des pays par défaut
    this.countries = [
      { nom: 'France', population: 65273511, superficie: 551695, continent: 'Europe', pib: 2715518, imageUrl: 'url_to_image' },
      // Ajoutez d'autres pays ici
    ];
  }

  getCountries() {
    return this.countries;
  }

  addCountry(country: Country) {
    this.countries.push(country);
  }

  updateCountry(index: number, country: Country) {
    this.countries[index] = country;
  }


  deleteCountry(index: number) {
    this.countries.splice(index, 1);
  }

}
