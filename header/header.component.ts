import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CountryService} from "../service/country.service";
import {Country} from "../model/country.model";

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
  newCountry: Country = { nom: '', population: 0, superficie: 0, continent: '', pib: 0, imageUrl: '' };



  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.allCountries = this.countryService.getCountries();
    this.countries = this.allCountries;
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
    this.newCountry = { nom: '', population: 0, superficie: 0, continent: '', pib: 0, imageUrl: '' }; // Reset
  }

  addCountry() {
    this.addCountryEvent.emit(this.newCountry);
    this.closeModal();
  }
/*
  search(query: string) {
    this.countryService.filterCountries(query);
  }

  exportToCSV() {
    const countries = this.countryService.getCountries();
    const csvContent = this.convertToCSV(countries);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'countries.csv');
  }

  addCountry() {
    const dialogRef = this.dialog.open(CountryModalComponent, {
      data: { country: null } // Pas de données pour l'ajout d'un nouveau pays
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countryService.addCountry(result);
      }
    });
  }

  convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array.map(it => {
      return Object.values(it).toString();
    }).join('\n');
  }
*/
}
