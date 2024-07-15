import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from "../service/country.service";
import { Country } from "../model/country.model";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @Input() countries: Country[] = [];
  allCountries: Country[] = []; // Stocke tous les pays
  selectedCountry: Country | any = null;
  showModal = false;

  constructor(private countryService: CountryService) {
    this.allCountries = this.countryService.getCountries(); // Charge tous les pays
    this.countries = [...this.allCountries]; // Initialement, tous les pays sont affichés
  }

  ngOnInit(): void {}

  editCountry(country: Country) {
    this.selectedCountry = { ...country }; // Copie du pays
    this.showModal = true;
  }

  saveCountry() {
    if (this.selectedCountry) {
      const index = this.allCountries.findIndex(c => c.nom === this.selectedCountry.nom);
      if (index !== -1) {
        this.countryService.updateCountry(index, this.selectedCountry);  // Met à jour le pays dans le service
        // Réactualiser allCountries après mise à jour
        this.allCountries[index] = { ...this.selectedCountry };
      }
    }
    this.closeModal();  // Ferme le modal
    this.countries = [...this.allCountries]; // Met à jour la liste affichée
  }

  closeModal() {
    this.showModal = false;
    this.selectedCountry = null; // Réinitialise la sélection
  }

  sort(property: keyof Country) {
    this.countries.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  filterBy(property: keyof Country) {
    this.countries = this.allCountries.filter(country => country[property]);
    console.log(`Filtering by ${property}`);
  }

  deleteCountry(index: number) {
    this.countryService.deleteCountry(index);
    this.allCountries = this.countryService.getCountries(); // Rafraîchir allCountries
    this.countries = [...this.allCountries]; // Réinitialiser countries après suppression
  }

  addCountry(country: Country) {
    this.countryService.addCountry(country);
    this.allCountries = this.countryService.getCountries(); // Rafraîchir allCountries
    this.countries = [...this.allCountries]; // Réinitialiser countries après ajout
  }
}
