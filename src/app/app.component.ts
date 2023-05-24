import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'routing-app';
  isAuthorized: boolean = false;

  constructor(private router: Router, private sharedService: SharedService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthorization();
      }
    });
  }

  ngOnInit() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    
    this.isAuthorized = this.sharedService.acess;
  }

  onAuthorizationChange(authorized: boolean) {
    this.isAuthorized = authorized;
  }
}
