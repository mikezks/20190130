import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';

const routes: Routes = [
  {
    path: 'flight-booking',
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent,
        data: {
          label: 'Flight Search'
        }
      },
      {
        path: 'flight-edit',
        component: FlightEditComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent
      },
      {
        path: 'flight-typeahead',
        component: FlightTypeaheadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
