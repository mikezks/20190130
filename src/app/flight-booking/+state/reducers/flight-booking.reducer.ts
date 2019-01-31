
import { FlightBookingActions, FlightBookingActionTypes } from '../actions/flight-booking.actions';
import { Flight } from '../../../entities/flight';

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export function reducer(state = initialState, action: FlightBookingActions): State {
  switch (action.type) {

    case FlightBookingActionTypes.FlightsLoadedAction:
      return { ...state, flights: action.flights };

    default:
      return state;
  }
}
