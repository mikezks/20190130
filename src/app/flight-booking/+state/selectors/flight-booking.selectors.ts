import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import { State } from '../reducers/flight-booking.reducer';
import * as fromRoot from '../../../+state';
import { Flight } from 'src/app/entities/flight';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const getFlightBookingState =
    createFeatureSelector<State>('flightBooking');

//export const getRouterState = fromRoot.

export const getFlights = createSelector(
    // Selector
    getFlightBookingState,
    // Projector
    (state: State) => state.flights
);

export const getDelayedFlights = createSelector(
    getFlights,
    (flights: Flight[]) => flights.filter(f => f.delayed)
);

export const getSumDelayedFlights = createSelector(
    getDelayedFlights,
    (flights: Flight[]) => flights.length
);

export const getScheduledFlights = createSelector(
    getFlights,
    (flights: Flight[]) => flights.filter(f => !f.delayed)
);

export const getSumScheduledFlights = createSelector(
    getScheduledFlights,
    (flights: Flight[]) => flights.length
);

export const getTotalFlights = createSelector(
    getSumDelayedFlights,
    getSumScheduledFlights,
    (sumDelayedFlights: number, sumScheduledFlights: number) =>
        sumDelayedFlights + sumScheduledFlights
);


export const getDelayedRxJSOperator = () =>
    pipe(
        select(getFlights),
        map(flights =>
            flights.filter(f => f.delayed)
        )
    );
