import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    ngOnInit(): void {
    }

/*
  constructor(private countryService: CountryService, public dialog: MatDialog) {}

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
