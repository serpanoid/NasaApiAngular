import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
// AbnXhIuJIedy22Mu18fd2qZDuc3yBcBFg7Ek1Bu2
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {
  public nasa!: Nasa[];
  public currentIndex: number = 0;
  public urls! : string[];
  public componentOpened: boolean = false; // Флаг, указывающий, что компонент открыт

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urls = [];
  }
  ngOnInit() {
   

    this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.sharedService.key}&count=10`)
      .subscribe(data => {
        let temp: string = JSON.stringify(data);
        this.nasa = JSON.parse(temp);
      });
    
  }

  public nextImage() {
    this.urls = [];

    if (this.currentIndex < this.nasa.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
   
  }
  public lastImage() {
    this.urls = [];

    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.nasa.length;
    }
  }
  public showCopyright() {
    this.urls = [];
   this.nasa.forEach(element => {
     if(element.copyright == this.nasa[this.currentIndex].copyright){
        this.urls.push(element.hdurl);
     }
   });
   
  }
  
}

export class Nasa {
  public copyright: string;
  public date: string;
  public explanation: string;
  public hdurl: string;
  public media_type: string;
  public service_version: string;
  public title: string;
  public url: string;

  constructor(c: string, d: string, ex: string, hdr: string, media: string, serv: string, title: string, url: string) {
    this.copyright = c;
    this.date = d;
    this.explanation = ex;
    this.hdurl = hdr;
    this.media_type = media;
    this.service_version = serv;
    this.title = title;
    this.url = url;
  }
}
