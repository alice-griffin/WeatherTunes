import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpotifyService } from '../spotify.service';
import { NgForm } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor(private weatherService: WeatherService, private spotifyService: SpotifyService) {};

  weather: any;
  weatherDesc: string;
  isSubmitted: boolean = false; 
  icon: any; 
  iconUrl: string;
  artist: any;
  artistId: string;
  playlist: any; 

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
      this.isSubmitted = true; 
      this.icon = data.weather[0].icon;
      this.iconUrl = "http://openweathermap.org/img/wn/" + this.icon + ".png";
    });
  };

  artistFormSubmitted(data: NgForm) {  
    let parameters = {
      q: data.value.artist
    }
    this.spotifyService.getArtist(parameters).subscribe((data: any ) => {
      this.artist = data; 
      this.artistId = data.artists.items[0].id; 
    });
    
    let params = {
      artist: this.artistId
    }
    this.spotifyService.getPlaylist(params).subscribe((data: any) => {
      this.spotifyService.playlist = data;
      console.log(data);
    });
    
}

}