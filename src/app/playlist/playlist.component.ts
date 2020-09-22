import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SearchCriteriaComponent } from '../search-criteria/search-criteria.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  checkEmpty: boolean;

  ngOnInit(): void {
    
  }

  getPlaylist() {
      return this.spotifyService.playlist;
    }

  getEmpty() {
    console.log(this.spotifyService.checkEmpty);
    return this.spotifyService.checkEmpty;
  }

}

