import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpotifyService } from '../spotify.service';
import { NgForm } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    private spotifyService: SpotifyService
  ) {}

  weather: any;
  weatherDesc: string;
  isSubmitted: boolean = false;
  icon: any;
  iconUrl: string;
  artist: any = '';
  artistId: string;
  genre: any;

    
  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) => {
      console.log(data);
      this.spotifyService.token = 'Bearer ' + data.access_token;
    });
  }

  searchFormSubmitted(data: NgForm) {
    this.weatherService.getWeather(data.value.zipCode).subscribe((da: any) => {
      this.weather = da;
      this.weatherDesc = da.weather[0].main;
      console.log(this.weatherDesc);
      console.log(this.weather);
      this.isSubmitted = true;
      this.icon = da.weather[0].icon;
      this.iconUrl = 'http://openweathermap.org/img/wn/' + this.icon + '.png';
      let parameters = {
        q: data.value.artist,
      };
      this.spotifyService.getArtist(parameters).subscribe((d: any) => {
        console.log(d);
        this.artist = d;
        this.artistId = d.artists.items[0].id;
        let params = {
            artist: this.artistId,
            valence: data.value.valence,
          };
        this.getPlaylistParameters('Mist', params);
        this.spotifyService.getPlaylist(params).subscribe((res: any) => {
          this.spotifyService.playlist = res;
          console.log(res);
        });
      });
    });
  }

  getPlaylistParameters(weather: string, parameters: any) {
    switch (weather) {
      case 'Mist':
        parameters.target_energy = 0.3;
        parameters.target_acousticness = 1.0; 
        break;
      case 'Thunderstorm':
        parameters.target_energy = 0.6;
        parameters.target_mode = 0; 
        break;
      case 'Drizzle':
        parameters.target_energy = 0.4;
        parameters.target_instrumentalness = 1.0; 
        break;
      case 'Rain':
        parameters.target_energy = 0.5;
        parameters.target_instrumentalness = 1.0; 
        break;
      case 'Snow':
        parameters.target_energy = 0.2; 
        break;
      case 'Clear':
        parameters.target_danceability = 1.0;
        parameters.target_popularity = 100; 
        break;
      case 'Clouds':
        parameters.target_energy = 0.5;
        parameters.target_acousticness = 0.5
        break;
      case 'Rainy':
        parameters.target_energy = 0.2;
        parameters.target_acousticness = 1.0; 
        break;
      case 'Smoke':
        parameters.target_energy = 0.8;
        parameters.target_danceability = 0.0;
        break;
      case 'Haze':
        parameters.target_energy = 0.3;
        parameters.target_acousticness = 1.0; 
        break;
      case 'Dust':
        parameters.target_energy = 0.6;
        parameters.target_min_tempo = 150; 
        break;
      case 'Fog':
        parameters.target_energy = 0.3;
        parameters.target_danceability = 0.4; 
        break;
      case 'Sand':
        parameters.target_energy = 1;
        parameters.target_danceability = 1;
        break;
      case 'Ash':
        parameters.target_energy = 0.8;
        parameters.target_danceability = 0;
        break;
      case 'Squall':
        parameters.target_energy = 0.7;
        parameters.target_danceability = 0.7;
        break;
      case 'Tornado':
        parameters.target_energy = 1.0;
        parameters.target_danceability = 0.4;
        break;
      default:
        console.log('default hit');
    }
  }
}
