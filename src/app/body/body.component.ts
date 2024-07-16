import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from "../service/country.service";
import { Country } from "../model/country.model";
import {Router} from "@angular/router";
import {Continent} from "../enum/continent.enum";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @Input()
  countries: Country[] = [];
  allCountries: Country[] = []; // Stocke tous les pays
  selectedCountry: Country | any = null;
  showModal = false;
  imageUrl: string | ArrayBuffer | null = null;


  constructor(private countryService: CountryService, private router: Router) {
    this.allCountries = this.countryService.getCountries(); // Charge tous les pays
    this.countries = [...this.allCountries]; // Initialement, tous les pays sont affichés
  }




  ngOnInit(): void {
    this.countries = this.countryService.getCountries();
    this.countryService.setTitle('Gestion des pays'); // Met à jour le titre au démarrage
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      this.imageUrl = savedImage;
    }
    this.loadImagesFromLocalStorage();


  }

  getRowClass(index: number): string {
    if (index % 2 === 0) {
      return 'even-row';  // Ligne blanche
    } else {
      return 'odd-row';   // Ligne gris clair
    }
  }
  onFileSelected(event: Event, country: Country): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        country.imageUrl = reader.result as string;
        localStorage.setItem(`image_${country.nom}`, country.imageUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  getContinents() {
    return Object.values(Continent);
  }
  loadImagesFromLocalStorage(): void {
    this.countries.forEach(country => {
      const imageUrl = localStorage.getItem(`image_${country.nom}`);
      if (imageUrl) {
        country.imageUrl = imageUrl;
      }
    });
  }
  onFileSelectedForEdit(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (this.selectedCountry) {
          this.selectedCountry.imageUrl = reader.result as string;
          localStorage.setItem(`image_${this.selectedCountry.nom}`, this.selectedCountry.imageUrl);
        }
      };

      reader.readAsDataURL(file);
    }
  }


  goToCountryDetail(countryName: string) {
    this.router.navigate(['/country', countryName]);
  }
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



}
