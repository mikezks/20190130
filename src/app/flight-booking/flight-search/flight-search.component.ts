import { Component, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import * as fromFlightBooking from '../+state/reducers/flight-booking.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { FlightsLoadedAction } from '../+state/actions/flight-booking.actions';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg';
  to: string = 'Graz';
  flights: Flight[] = [];
  selectedFlight: Flight;
  flights$: Observable<Flight[]>;

  basket: object = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<{ flightBooking: fromFlightBooking.State}>) { }

  ngOnInit() {
    this.flights = this.flightService.flights;
    this.flights$ = this.store
      .pipe(
        select(s => s.flightBooking.flights)
      );
  }

  search(): void {
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        (flights: Flight[]) => {
          // this.flights = flights;
          this.store.dispatch(
            new FlightsLoadedAction(flights)
          );
        },
        (errResp) => {
          console.log('Error loading flights', errResp);
        }
      );
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

}
