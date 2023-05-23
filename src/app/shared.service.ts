import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public key : string = '';
  public acess : boolean = false;
  constructor() { }
}
