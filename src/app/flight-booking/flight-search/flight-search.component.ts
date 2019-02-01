import { Component, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import * as fromFlightBooking from '../+state/reducers/flight-booking.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { FlightsLoadedAction, FlightUpdateAction, FlightsLoadAction } from '../+state/actions/flight-booking.actions';
import { take } from 'rxjs/operators';
import { getFlights, getSumDelayedFlights } from '../+state/selectors/flight-booking.selectors';

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
  delayedFlights$: Observable<number>;

  basket: object = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.State>) { }

  ngOnInit() {
    //this.flights = this.flightService.flights;
    this.flights$ = this.store
      .pipe(
        select(getFlights)
      );
    this.delayedFlights$ = this.store
      .pipe(
        select(getSumDelayedFlights)
      );
  }

  search(): void {
    this.store.dispatch(new FlightsLoadAction(this.from, this.to));
  }

  searchWithService(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService
      .find(this.from, this.to)
      .subscribe(
        (flights: Flight[]) => {
          this.flights = flights;
        },
        (errResp) => {
          console.log('Error loading flights', errResp);
        }
      );
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flights$
      .pipe(
        take(1)
      )
      .subscribe(flights => {
        const flight = flights[0];

        const oldDate = new Date(flight.date);
        const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
        const newFlight = {
          ...flight,
          date: newDate.toISOString(),
          delayed: true
        };

        this.store.dispatch(new FlightUpdateAction(newFlight));
      });
  }
}
