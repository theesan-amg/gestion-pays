import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import {HeaderComponent} from "./header/header.component";

const routes: Routes = [
  { path: 'country/:name', component: CountryDetailComponent } // Détails d'un pays
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
