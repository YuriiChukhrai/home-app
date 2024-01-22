import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  //readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  //eadonly baseUrl = '/assets';
  //housingLocationList: HousingLocation[] = [{JSON here}];
  url = 'http://localhost:3000/locations'

  constructor() { }

  

  async getAllHousingLocation(): Promise<HousingLocation[]> {
    // return this.housingLocationList;
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined> {
    //return this.housingLocationList.find(housingLocation => housingLocation.id === id);
    const data = await fetch(`${this.url}/${id}`) ?? [];
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
