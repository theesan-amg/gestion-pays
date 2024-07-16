import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountryService} from "../service/country.service";
import {Country} from "../model/country.model";
import {Router} from "@angular/router";
import {Continent} from "../enum/continent.enum";
import { saveAs } from 'file-saver'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() addCountryEvent = new EventEmitter<Country>();


  countries: Country[] = [];
  allCountries: Country[] = [];
  showModal = false;
  newCountry: Country = { nom: '', population: 0, superficie: 0, continent: Continent.Europe, pib: 0, imageUrl: '' };
  title: string = '';
  showActions: boolean = false;
  showSearchInput = false; // Contrôle la visibilité de l'input


  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.allCountries = this.countryService.getCountries();
    this.countries = this.allCountries;
    this.countryService.title$.subscribe(title => {
      this.title = title;
    });
    this.loadImagesFromLocalStorage();

  }

  toggleSearchInput(): void {
    this.showSearchInput = !this.showSearchInput; // Basculer l'état de visibilité
  }

  navigateToHome() {
    this.router.navigate(['/']);
    this.showActions = true;

  }
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchEvent.emit(target.value);
  }

  openAddCountryModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newCountry = { nom: '', population: 0, superficie: 0, continent: Continent.Europe, pib: 0, imageUrl: '' }; // Reset
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newCountry.imageUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addCountry() {
    localStorage.setItem(this.newCountry.nom, JSON.stringify(this.newCountry));
    this.addCountryEvent.emit(this.newCountry);
    this.closeModal();
  }

  loadImagesFromLocalStorage() {
    const countriesFromStorage = Object.keys(localStorage).map(key => {
      return JSON.parse(localStorage.getItem(key)!);
    });
    this.countries = countriesFromStorage;
  }
  getContinents() {
    return Object.values(Continent);
  }
  exportToCSV() {
    const csvContent = this.countryService.convertToCSV(this.allCountries);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'countries.csv');
  }
}
