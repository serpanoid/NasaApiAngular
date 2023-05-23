import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-six',
  templateUrl: './six.component.html',
  styleUrls: ['./six.component.css']
})
export class SixComponent {
  inputValue: string = '';
  isAuthorized: boolean = false;
  @Output() authorizationChange = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.isAuthorized = this.sharedService.acess;
  }

  saveInput() {
    console.log(this.inputValue);


    if (this.inputValue && this.inputValue.length >= 40) {
      this.sharedService.key = this.inputValue;
      this.sharedService.acess = true;
      this.isAuthorized = true;
      this.authorizationChange.emit(true);
    } else {
      this.sharedService.key = '';
      this.sharedService.acess = false;
      this.isAuthorized = false;
      this.authorizationChange.emit(false);
    }
  }

  openLink() {
    const url = 'https://api.nasa.gov'; 
    window.open(url, '_blank');
  }

  logout() {
    this.sharedService.key = '';
    this.sharedService.acess = false;
    this.isAuthorized = false;
    this.authorizationChange.emit(false);
  }
}
