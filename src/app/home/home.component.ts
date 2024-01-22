import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
<form action="">
  <input type="text" placeholder="Filter bu city" #filter>
  <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
</form>
  </section>

  <section class="results">
    <!-- <app-housing-location *ngFor="let housingLocation of housingLocationList"  -->
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" 
    [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  //readonly baseUrl = '/assets';

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    // this.housingLocationList = this.housingService.getAllHousingLocation();
    this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if(!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city
                                          .toLocaleLowerCase()
                                          .includes(text.toLocaleLowerCase())
    );
  }
}
