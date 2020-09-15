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
  genres: string;

    
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
    genreInput.style.display = "block";
    genreBtn.style.border = "2px solid orange";
    if (artistInput.style.display === "block") {
      artistInput.style.display = 'none';
      artistBtn.style.border = 'none';
    }
  }

  showArtistInput() {
  let genreInput = document.getElementById('genre') as HTMLElement;
  let artistInput = document.getElementById('artist') as HTMLElement;
  let genreBtn = document.getElementById('genre-btn') as HTMLElement;
  let artistBtn = document.getElementById('artist-btn') as HTMLElement;
    artistInput.style.display = "block";
    artistBtn.style.border = "2px solid orange";
    if (genreInput.style.display === "block") {
        genreInput.style.display = 'none';
        genreBtn.style.border = 'none'
    }
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
            genre: data.value.genre
          };
        this.spotifyService.getPlaylist(this.weatherDesc, params).subscribe((res: any) => {
          this.spotifyService.playlist = res.tracks;
          console.log(res);
        });
      });
    });
  }
}



  // searchFormSubmitted(data: NgForm) {
  //   this.weatherService.getWeather(data.value.zipCode).subscribe((da: any) => {
  //     this.weather = da;
  //     this.weatherDesc = da.weather[0].main;
  //     console.log(this.weatherDesc);
  //     console.log(this.weather);
  //     this.isSubmitted = true;
  //     this.icon = da.weather[0].icon;
  //     this.iconUrl = 'http://openweathermap.org/img/wn/' + this.icon + '.png';
  //     let parameters = {
  //       q: data.value.artist,
  //     };
  //     let artistSubmitted = document.getElementById('artist')
  //     if (artistSubmitted.style.display === "block") {
  //       this.spotifyService.getArtist(parameters).subscribe((d: any) => {
  //         console.log(d);
  //         this.artist = d;
  //         this.artistId = d.artists.items[0].id;
  //     });
  //     if (artistSubmitted.style.display === "block") {
  //       let params = {
  //         artist: this.artistId,
  //         valence: data.value.valence,
  //         };
  //         this.spotifyService.getPlaylist(this.weatherDesc, params).subscribe((res: any) => {
  //           this.spotifyService.playlist = res.tracks; 
  //    });
  //    } else {
  //       let params = {
  //         genres: data.value.genre,
  //         valence: data.value.valence,
  //         }
  //         this.spotifyService.getPlaylist(this.weatherDesc, params).subscribe((res: any) => {
  //           this.spotifyService.playlist = res.tracks; 
  //         });
  //       }
  //     }
  //   });
  // }

