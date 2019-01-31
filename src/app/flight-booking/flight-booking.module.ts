import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';

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
    SharedModule
  ]
})
export class FlightBookingModule { }
