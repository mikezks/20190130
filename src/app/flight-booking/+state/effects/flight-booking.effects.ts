import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { FlightBookingActionTypes, FlightsLoadAction, FlightsLoadedAction } from '../actions/flight-booking.actions';
import { FlightService } from '../../services/flight.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

  @Effect()
  flightLoad$ =
    this.actions$
      .pipe(
        ofType(FlightBookingActionTypes.FlightsLoadAction),
        switchMap((a: FlightsLoadAction) => this.flightService.find(a.from, a.to)),
        map(flights => new FlightsLoadedAction(flights))
      );

  constructor(
    private flightService: FlightService,
    private actions$: Actions) {}

}
