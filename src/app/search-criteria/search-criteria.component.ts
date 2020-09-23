import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpotifyService } from '../spotify.service';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';

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
  isEmpty: boolean = false;
  icon: any;
  iconUrl: string;
  artist: any;
  artistId: string;
  genres: string;
  genre: string;

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) => {
      console.log(data);
      this.spotifyService.token = 'Bearer ' + data.access_token;
    });
  }

  showGenreInput() {
    let genreInput = document.getElementById('genre') as HTMLElement;
    let artistInput = document.getElementById('artist') as HTMLElement;
    let artistBtn = document.getElementById('artist-btn') as HTMLElement;
    let genreBtn = document.getElementById('genre-btn') as HTMLElement;
    genreInput.style.display = 'block';
    genreBtn.style.border = '2px solid orange';
    if (artistInput.style.display === 'block') {
      artistInput.style.display = 'none';
      artistBtn.style.border = 'none';
    }
  }

  showArtistInput(data: any) {
    this.genre = '';
    console.log(data.value);
    let genreInput = document.getElementById('genre') as HTMLElement;
    let artistInput = document.getElementById('artist') as HTMLElement;
    let genreBtn = document.getElementById('genre-btn') as HTMLElement;
    let artistBtn = document.getElementById('artist-btn') as HTMLElement;
    artistInput.style.display = 'block';
    artistBtn.style.border = '2px solid orange';
    if (genreInput.style.display === 'block') {
      genreInput.style.display = 'none';
      genreBtn.style.border = 'none';
    }
  }

  checkInputs() {
    let zipInput = document.getElementById('zipCode') as HTMLInputElement;
    let artistInput = document.getElementById('artist') as HTMLInputElement;
    let zipError = document.getElementById('zip-error') as HTMLElement;
    let artistError = document.getElementById('artist-error') as HTMLElement;

    let zipValue = zipInput.value;
    let artistValue = artistInput.value;

    if (!zipValue) {
      zipError.style.visibility = 'visible';
    } else {
      zipError.style.visibility = 'hidden';
    }

    if (!artistValue && !this.genre) {
      artistError.style.visibility = 'visible';
    } else {
      artistError.style.visibility = 'hidden';
    }
  }

  searchFormSubmitted(data: NgForm) {
    this.checkInputs();
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
      if (this.genre) {
        let params = {
          valence: data.value.valence,
          genres: this.genre.replace(' ', '-')
        }
        this.spotifyService
            .getPlaylist(this.weatherDesc, params)
            .subscribe({
              next: this.onSuccess.bind(this),
              error: this.onError.bind(this),
            });
      } else {
        this.spotifyService.getArtist(parameters).subscribe((d: any) => {
          console.log(d);
          this.artist = d;
          this.artistId = d.artists.items[0].id;
          let params = {
            artist: this.artistId,
            valence: data.value.valence,
          };
          this.spotifyService
            .getPlaylist(this.weatherDesc, params)
            .subscribe({
              next: this.onSuccess.bind(this),
              error: this.onError.bind(this),
            });
        });
      }
    });
  }

  onSuccess(data: any) {
    if (data.tracks.length === 0) {
      this.isEmpty = true;
      console.log(this.isEmpty);
    } else {
      this.isEmpty = false;
      this.spotifyService.playlist = data.tracks;
    }
  }

  onError(error: Error) {
    console.log(error.message);
  }

}