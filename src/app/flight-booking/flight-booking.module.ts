import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';
import { StoreModule } from '@ngrx/store';
import * as fromFlightBooking from './+state/reducers/flight-booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FlightBookingEffects } from './+state/effects/flight-booking.effects';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    FlightEditComponent,
    FlightTypeaheadComponent
  ],
  imports: [
    CommonModule,
    FlightBookingRoutingModule,
    SharedModule,
    StoreModule.forFeature('flightBooking', fromFlightBooking.reducer),
    EffectsModule.forFeature([FlightBookingEffects])
  ]
})
export class FlightBookingModule { }
