import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FlightSearchComponent } from './flight-search.component';
import { StoreModule } from '@ngrx/store';
import * as fromFlightBooking from '../+state/reducers/flight-booking.reducer';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { Observable, of } from 'rxjs';
import { Flight } from 'src/app/entities/flight';
import { FlightService } from '../services/flight.service';
import { By } from '@angular/platform-browser';


describe('FlightSearchComponent', () => {
  let comp: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'flightBooking': fromFlightBooking.reducer }),
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    comp = fixture.componentInstance;
  }));

  it('should have "from" set to "Hamburg" initially', () => {
    expect(comp.from).toBe('Hamburg');
  });

});

describe('Tests with flightServiceMock', () => {

  let comp: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  const data = [
    { id: 17, from: 'Graz', to: 'Hamburg', date: '2018-07-09T12:00:00+00:00', delayed: true},
    { id: 18, from: 'Vienna', to: 'Barcelona', date: '2018-07-09T13:00:00+00:00', delayed: true },
    { id: 19, from: 'Frankfurt', to: 'Salzburg', date: '2018-07-09T14:00:00+00:00', delayed: true },
  ];

  const flightServiceMock = {
    find(from: string, to: string): Observable<Flight[]> {
      return of(data);
    },
    flights: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ 'flightBooking': fromFlightBooking.reducer }),
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent
      ]
    })
    .overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          {
            provide: FlightService,
            useValue: flightServiceMock
          }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    comp = fixture.componentInstance;
  }));

  it('should not load flights w/o from and to', () => {
    comp.from = '';
    comp.to = '';
    fixture.detectChanges();
    comp.searchWithService();

    expect(comp.flights.length).toBe(0);
  });

  it('should load flights w/ from and to', () => {
    comp.from = 'Graz';
    comp.to = 'Hamburg';
    fixture.detectChanges();
    comp.searchWithService();

    expect(comp.flights.length).toBe(3);
  });
});

describe('Testing a component template', () => {
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [
              StoreModule.forRoot({ 'flightBooking': fromFlightBooking.reducer }),
              RouterTestingModule,
              HttpClientModule,
              SharedModule
          ],
          declarations: [
              FlightSearchComponent,
              FlightCardComponent
          ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(FlightSearchComponent);
  }));

  it('should have a disabled search button w/o params', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const from = fixture
                  .debugElement
                  .query(By.css('input[name=from]'))
                  .nativeElement;
    
    from.value = '';
    from.dispatchEvent(new Event('input'));

    /* const to = fixture
                .debugElement
                .query(By.css('input[name=to]'))
                .nativeElement;
    
    to.value = '';
    to.dispatchEvent(new Event('input')); */

    fixture.detectChanges();
    tick();

    const searchButton = fixture
                          .debugElement
                          .query(By.css('button'))
                          .properties['disabled'];

    expect(searchButton).toBeTruthy();
  }));
});
