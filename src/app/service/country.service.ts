import {Injectable} from '@angular/core';
import {Country} from "../model/country.model";
import {BehaviorSubject} from "rxjs";
import {Continent} from "../enum/continent.enum";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = [];
  private titleSubject = new BehaviorSubject<string>('Gestion des pays');
  title$ = this.titleSubject.asObservable();

  constructor() {
    this.countries = [
      { nom: 'France', population: 65273511, superficie: 551695, continent: Continent.Europe, pib: 2715518, imageUrl: 'url_to_image' },
      { nom: 'Allemagne', population: 83783942, superficie: 357582, continent: Continent.Europe, pib: 3848172, imageUrl: 'url_to_image' },
      { nom: 'Japon', population: 126476461, superficie: 377975, continent: Continent.Asie, pib: 5179280, imageUrl: 'url_to'},
      // Ajoutez d'autres pays ici
    ];
  }

  convertToCSV(countries: Country[]): string {
    const header = 'Nom,Population,Superficie,Continent,PIB,Image URL\n';
    const rows = countries.map(country =>
      `${country.nom},${country.population},${country.superficie},${country.continent},${country.pib},${country.imageUrl}`
    ).join('\n');
    return header + rows;
  }
  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
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
    return this.countries.filter(country =>
      country.nom.toLowerCase().includes(term.toLowerCase())
    );
  }



}
