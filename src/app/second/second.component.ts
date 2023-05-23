import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';

interface Asteroid {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: number;
    };
    miss_distance: {
      kilometers: number;
    };
  }[];
}

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent {
  public currentIndex: number = 0;
  public urls: string[] = [];
  public asteroidData: Asteroid[] = [];
  public isFetchingImages: boolean = true;

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.http
      .get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${this.sharedService.key}&count=100`)
      .subscribe((data: any) => {
        console.log(data)
        const response: any = data;
        const asteroids: Asteroid[] = response.near_earth_objects['2015-09-07'];
        this.asteroidData = asteroids;
        this.fetchAsteroidImages().subscribe((urls: string[]) => {
          this.urls = urls;
          this.isFetchingImages = false;
        });
      });
  }
  // 'AbnXhIuJIedy22Mu18fd2qZDuc3yBcBFg7Ek1Bu2'
  private fetchAsteroidImages() {
    const apiKey = 'AbnXhIuJIedy22Mu18fd2qZDuc3yBcBFg7Ek1Bu2'; // Replace with your actual API key
    const imageRequests = [];
  
    for (const asteroid of this.asteroidData) {
      console.log(asteroid.close_approach_data)
      for (const closeApproachData of asteroid.close_approach_data) {
        
        const formattedDate = closeApproachData.close_approach_date;
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDate}`;
        imageRequests.push(this.http.get(url).pipe(
          map((data: any) => data.url)
        ));
      }
    }
  
    return forkJoin(imageRequests);
  }
  
  
  

  public nextImage() {
    if (!this.isFetchingImages) {
      if (this.currentIndex < this.urls.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    }
  }

  public lastImage() {
    if (!this.isFetchingImages) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.urls.length - 1;
      }
    }
  }

  public getAsteroidName() {
    if (this.asteroidData && this.asteroidData.length > 0) {
      return this.asteroidData[this.currentIndex].name;
    }
    return '';
  }

  public getMaxEstimatedDiameter() {
    if (this.asteroidData && this.asteroidData.length > 0) {
      return this.asteroidData[this.currentIndex].estimated_diameter.kilometers.estimated_diameter_max;
    }
    return '';
  }
  public getMinEstimatedDiameter() {
    if (this.asteroidData && this.asteroidData.length > 0) {
      return this.asteroidData[this.currentIndex].estimated_diameter.kilometers.estimated_diameter_min;
    }
    return '';
  }
}
