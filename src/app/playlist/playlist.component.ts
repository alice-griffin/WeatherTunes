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

  ngOnInit(): void {
    
  }

  getPlaylist() {
      return this.spotifyService.playlist;
    }

}

