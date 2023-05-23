import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent {
  public nasa!: ImageResponse;
  public currentIndex: number = 0;
  public urls! : string[];
  public day : number = 1;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urls = [];
  }
  ngOnInit() {
    this.http.get(`https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2020-${this.day}-11&&dim=0.10&api_key=${this.sharedService.key}`)
      .subscribe(data => {
       
        let temp: string = JSON.stringify(data);
        this.nasa = JSON.parse(temp);
      });
  }

  public nextImage() {
    this.day++;
    this.http.get(`https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2020-${this.day}-11&&dim=0.10&api_key=${this.sharedService.key}`)
      .subscribe(data => {
        console.log(data); // Отладочный вывод
        let temp: string = JSON.stringify(data);
        this.nasa = JSON.parse(temp);
      });
  }
  
   
  
  public lastImage() {
    this.day--;
    this.http.get(`https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2020-${this.day}-11&&dim=0.10&api_key=${this.sharedService.key}`)
      .subscribe(data => {
        console.log(data); // Отладочный вывод
        let temp: string = JSON.stringify(data);
        this.nasa = JSON.parse(temp);
      });
  }
  // public showCopyright() {
  //   this.urls = [];
  //  this.nasa.forEach(element => {
  //    if(element.copyright == this.nasa[this.currentIndex].copyright){
  //       this.urls.push(element.hdurl);
  //    }
  //  });
   
  // }
}

interface ImageResponse {
  date: string;
  id: string;
  resource: {
    dataset: string;
    planet: string;
  };
   service_version: string;
    url: string;
}
 
