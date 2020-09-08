import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  genre: any[]; 

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService.getToken().subscribe((data: any) => {
      this.spotifyService.token = 'Bearer ' + data.access_token;
    })
  }
  
      // this.spotifyService.getPlaylist({}).subscribe((response: any) => {
      //   console.log(response);


      // this.spotifyService.getGenres().subscribe((reply: any) => {
      //   this.genre = reply; 
      //   console.log(reply);

}
