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
      { nom: 'Allemagne', population: 83783942, superficie: 357582, continent: 'Europe', pib: 3848172, imageUrl: 'url_to_image' },
      { nom: 'Japon', population: 126476461, superficie: 377975, continent: 'Asie', pib: 5179280, imageUrl: 'url_to'},
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

  searchCountries(term: string): Country[] {
    return this.countries.filter(country => country.nom.toLowerCase().includes(term.toLowerCase()));
  }

  deleteCountry(index: number) {
    this.countries.splice(index, 1);
  }

}
