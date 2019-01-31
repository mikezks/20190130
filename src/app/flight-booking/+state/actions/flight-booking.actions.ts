import { Action } from '@ngrx/store';
import { Flight } from '../../../entities/flight';

export enum FlightBookingActionTypes {
  FlightsLoadedAction = '[FlightBooking] Flight loaded'
}

export class FlightsLoadedAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoadedAction;
  constructor(readonly flights: Flight[]) {}
} 



export type FlightBookingActions = 
  FlightsLoadedAction;
