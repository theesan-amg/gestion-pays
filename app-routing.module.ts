import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

const routes: Routes = [
  { path: '', component: BodyComponent }, // Page principale pour la gestion des pays
  { path: 'country/:name', component: CountryDetailComponent } // Détails d'un pays
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
