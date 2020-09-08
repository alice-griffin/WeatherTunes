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

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) => {
      console.log(data);
      this.spotifyService.token = 'Bearer ' + data.access_token;
    })
    
  }


  searchFormSubmitted(data: NgForm) {
    this.weatherService.getWeather(data.value.zipCode).subscribe((da: any) => {
      this.weather = da; 
      this.weatherDesc = da.weather[0].main;
      console.log(this.weatherDesc);
      console.log(this.weather);
      this.isSubmitted = true; 
      this.icon = da.weather[0].icon;
      this.iconUrl = "http://openweathermap.org/img/wn/" + this.icon + ".png";
      let parameters = {
        q: data.value.artist
      }
      this.spotifyService.getArtist(parameters).subscribe((d: any ) => {
        console.log(d)
        this.artist = d; 
        this.artistId = d.artists.items[0].id;
        let params = {
          artist: this.artistId
        }
        this.getPlaylistParameters('rainy', params);
        this.spotifyService.getPlaylist(params).subscribe((res: any) => {
          this.spotifyService.playlist = res;
          console.log(res);
        }); 
      });
    });
  }

  getPlaylistParameters(weather: string, parameters: any) {
    switch(weather) {
      case 'Mist':
        parameters.target_energy = 0.4;
        break;
      case '':
      default:
        console.log('default hit');

    }

  }
}