import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  getPlaylist() {
    return this.spotifyService.playlist;
  }

}
