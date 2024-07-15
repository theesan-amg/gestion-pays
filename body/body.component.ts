import { Component, OnInit } from '@angular/core';
import {CountryService} from "../service/country.service";
import {Country} from "../model/country.model";
import {CountryDetailComponent} from "../country-detail/country-detail.component";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  countries: Country[];

  constructor(private countryService: CountryService) {
    this.countries = this.countryService.getCountries();
  }

  ngOnInit(): void {
  }


  sort(property: keyof Country) {
    this.countries = this.countries.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }



  deleteCountry(index: number) {
    this.countryService.deleteCountry(index);
    this.countries = this.countryService.getCountries(); // Refresh the list
  }

  addCountry(country: Country) {
    this.countryService.addCountry(country);
    this.countries = this.countryService.getCountries(); // Rafraîchir la liste

  }


}
