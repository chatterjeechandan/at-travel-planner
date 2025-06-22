import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { init, loadRemote } from '@module-federation/enhanced/runtime';
import { GooglePlacesDirective } from './google-places.directive';
import { MfeBridgeService, TravelApiService } from '@ai-travel/apis';
import { TravelQuery, TravelPlanResult, Destination } from '@ai-travel/models';

init({
  name: '@module-federation-examples/wc-ng-shell',
  remotes: [
    {
      name: 'wc_react_remote',
      entry: 'http://localhost:4201/remoteEntry.js',
    },
  ],
});
loadRemote('wc_react_remote/Module');

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    GooglePlacesDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Travel Planner';

  @ViewChild('planMfe') planMfe!: ElementRef;
  @ViewChild('destinationsMfe') destinationsMfe!: ElementRef;

  fb = inject(FormBuilder);
  travelApi = inject(TravelApiService);
  mfeBridge = inject(MfeBridgeService);
  aiResult!: TravelPlanResult;
  loading = false;
  travelForm: FormGroup;
  popularDestinations: Destination[] = [];

  constructor() {
    this.travelForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.required, Validators.min(0)]],
      budget: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngAfterViewInit() {
    this.popularDestinations = [
      {
        id: '1',
        name: 'Bali',
        image: 'https://picsum.photos/400/300?bali',
        price: 12000
      },
      {
        id: '2',
        name: 'Paris',
        image: 'https://picsum.photos/400/300?paris',
        price: 25000
      },
      {
        id: '3',
        name: 'Dubai',
        image: 'https://picsum.photos/400/300?dubaii',
        price: 18000
      },
       {
        id: '1',
        name: 'Bali',
        image: 'https://picsum.photos/400/300?bali',
        price: 12000
      }
    ];
    this.mfeBridge.register('PlanCard', this.planMfe.nativeElement);
    this.mfeBridge.register('DestinationsGrid', this.destinationsMfe.nativeElement);
    setTimeout(() => {
      this.mfeBridge.update('DestinationsGrid', { destinations: this.popularDestinations });
    }, 1000);
  }

  async submit() {
    if (this.loading) return;
    this.loading = true;

    try {
      const raw = this.travelForm.value;

      const query: TravelQuery = {
        source: raw.source,
        destination: raw.destination,
        startDate: raw.startDate instanceof Date ? raw.startDate.toISOString() : raw.startDate,
        returnDate: raw.returnDate instanceof Date ? raw.returnDate.toISOString() : raw.returnDate,
        adults: raw.adults,
        children: raw.children,
        budget: raw.budget,
      };

      this.aiResult = await this.travelApi.getTravelPlan(query);
      console.log(this.aiResult);
      this.mfeBridge.update('PlanCard', { plan: this.aiResult });

    } catch (err) {
      console.error('AI call failed', err);
    } finally {
      this.loading = false;
    }
  }

  onSourcePlaceSelected(place: google.maps.places.PlaceResult) {
    this.travelForm.patchValue({ source: place.formatted_address });
  }

  onDestinationPlaceSelected(place: google.maps.places.PlaceResult) {
    this.travelForm.patchValue({ destination: place.formatted_address });
  }
}
