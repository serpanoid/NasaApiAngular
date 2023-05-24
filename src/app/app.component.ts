import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './shared.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'routing-app';
  isAuthorized: boolean = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private sharedService: SharedService) {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthorization();
      }
    });
  }

  ngOnInit() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    this.sharedService.access$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((access) => {
      this.isAuthorized = access;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAuthorizationChange(authorized: boolean) {
    this.sharedService.access = authorized;
  }
}
