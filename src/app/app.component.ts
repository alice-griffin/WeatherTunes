import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../app/weather.service';
import { NgForm } from '@angular/forms';  
import { SpotifyService } from '../app/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

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
