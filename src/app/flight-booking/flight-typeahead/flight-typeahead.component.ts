import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, take, map, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.scss']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  subscriptionTimer: Subscription;
  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    //this.rxjsDemo();
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
