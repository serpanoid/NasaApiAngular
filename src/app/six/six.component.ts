import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-six',
  template: `
    <div class="input-wrapper">
      <input class="input-field" [(ngModel)]="inputValue" placeholder="Enter your NASA API key">
    </div>
    <div class="button-group">
      <div class="button-container">
        <button (click)="saveInput()" [ngClass]="{'button': true, 'authorize-button': true, 'disabled': inputValue.length < 40 }">
          Authorize
        </button>
        <button *ngIf="isAuthorized" (click)="logout()" class="button logout-button">Logout</button>
        <button (click)="openRegistrationPage()" class="button register-button">Register</button>
      </div>
    </div>
  `,
  styleUrls: ['./six.component.css']
})
export class SixComponent {
  inputValue: string = '';
  isAuthorized: boolean = false;
  @Output() authorizationChange = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.isAuthorized = this.sharedService.access;
  }

  saveInput() {
    console.log(this.inputValue);

    if (this.inputValue && this.inputValue.length >= 40) {
      this.sharedService.key = this.inputValue;
      this.sharedService.access = true;
      this.isAuthorized = true;
      this.authorizationChange.emit(true);
      this.refreshNavigation(); // Refresh the navigation
    } else {
      this.sharedService.key = '';
      this.sharedService.access = false;
      this.isAuthorized = false;
      this.authorizationChange.emit(false);
    }
  }

  openRegistrationPage() {
    const url = 'https://api.nasa.gov';
    window.open(url, '_blank');
  }

  logout() {
    this.sharedService.key = '';
    this.sharedService.access = false;
    this.isAuthorized = false;
    this.authorizationChange.emit(false);
    this.refreshNavigation(); // Refresh the navigation
  }

  refreshNavigation() {
    const navigationEvent = new Event('NavigationEvent');
    document.querySelector('nav')?.dispatchEvent(navigationEvent);
  }
}
