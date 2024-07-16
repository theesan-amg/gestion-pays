import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Country} from "../model/country.model";
import {CountryService} from "../service/country.service";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  country: Country | undefined;
  constructor(private route: ActivatedRoute , private countryService: CountryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const countryName = params['name'];
      this.country = this.getCountryByName(countryName);
      if (this.country) {
        this.countryService.setTitle(this.country.nom); // Mettez à jour le titre
      }
    });
  }

  getCountryByName(name: string): Country | undefined {
    const countries = this.countryService.getCountries();
    return countries.find(country => country.nom === name);
  }

}
