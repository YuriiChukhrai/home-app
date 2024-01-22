import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- <p>housingLocationId: {{housingLocation?.id}}</p> -->
    <article> 
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">
      <section class="listing-description">
        <h2 class="listing-heading">
          {{housingLocation?.name}}</h2>
          <p class="listing-location">
            {{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>

      <section class="listing-features">
        <h2 class="selection-heading">About this housing location</h2>
      <ul>
        <li><b>Units:</b> {{housingLocation?.availableUnits}}</li>
        <li><b>WiFi:</b> {{housingLocation?.laundry}}</li>
        <li><b>Laundry:</b> {{housingLocation?.laundry}}</li>
      </ul>
      </section>

      <section class="listing-apply">
        <h2 class="selection-heading">Allpy now to live here</h2>
       
        <form [formGroup]="applyForm" (submit)="submitApplication()">

        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="text" formControlName="email">

        <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  // housingLocationId = 0;
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    //this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });

  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
      );
  }
}
