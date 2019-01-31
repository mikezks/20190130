import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, take, map, share, takeUntil, debounceTime, switchMap, filter, distinctUntilChanged, delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from 'src/app/entities/flight';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.scss']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscriptionTimer: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();

    this.flights$ =
      this.control.valueChanges
        .pipe(
          filter((value: string) => value.length >= 3),
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => this.loading = true),
          switchMap(value => this.load$(value)),
          delay(5000),
          tap(() => this.loading = false)
        );
  }

  load$(from: string): Observable<Flight[]>  {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {

    this.timer$ = timer(0, 1000)
      .pipe(
        tap(data => console.log('timer 1', data)),
        share()
      );
    //this.subscriptionTimer = this.timer$.subscribe(data => console.log(data));

    const timer2$ = this.timer$
        .pipe(
          takeUntil(this.destroy$),
          map(value => value * 5)
        )
        .subscribe(data => console.log('timer 2', data));

    const timer3$ = this.timer$
        .pipe(
          takeUntil(this.destroy$),
          take(4)
        )
        .subscribe(data => console.log('timer 3', data));

  }

  ngOnDestroy(): void {
    //this.subscriptionTimer.unsubscribe();
    this.destroy$.next(true);
  }

}
