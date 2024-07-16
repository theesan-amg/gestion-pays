import {Continent} from "../enum/continent.enum";

export interface Country {
  nom: string;
  population: number;
  superficie: number;
  continent: Continent;
  pib: number;
  imageUrl: string;
}
