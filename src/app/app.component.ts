import { Component } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  genre: any[]; 

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.getToken().subscribe((data: any) => {
      console.log(data);
      this.spotifyService.token = 'Bearer ' + data.access_token;

      this.spotifyService.getPlaylist({}).subscribe((response: any) => {
        console.log(response);

      this.spotifyService.getArtistId({}).subscribe((res: any ) => {
        console.log(res);

      this.spotifyService.getGenres().subscribe((reply: any) => {
        this.genre = reply; 
        console.log(reply);
      })
      })
      })
    });
  }
}
