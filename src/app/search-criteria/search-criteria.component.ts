import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpotifyService } from '../spotify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor(private weatherService: WeatherService, private spotifyService: SpotifyService) {};

  weather: any;
  weatherDesc: string;

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) => {
      console.log(data);
      this.spotifyService.token = 'Bearer ' + data.access_token;
    })
    
  }

  formSubmitted(data: NgForm) {
    this.weatherService.getWeather(data.value.zipCode).subscribe((data: any) => {
      this.weather = data; 
      this.weatherDesc = data.weather[0].description;
      console.log(this.weatherDesc);
      console.log(this.weather);
    });
  }
}
