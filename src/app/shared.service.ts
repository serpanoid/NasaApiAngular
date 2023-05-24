import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnDestroy {
  private _accessSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  access$ = this._accessSubject.asObservable();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  get access(): boolean {
    return this._accessSubject.value;
  }

  set access(value: boolean) {
    this._accessSubject.next(value);
  }

  key: string = '';

  constructor() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
