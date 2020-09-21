import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { SearchCriteriaComponent } from '../search-criteria/search-criteria.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements AfterViewInit {

  constructor(private spotifyService: SpotifyService) { }

  @ViewChild(SearchCriteriaComponent) childReference;
  checkEmpty: any;

  ngAfterViewInit(): void {
    this.checkEmpty = this.childReference.isEmpty; 
    console.log(this.checkEmpty)
  }

  getPlaylist() {
      return this.spotifyService.playlist;
    }

}

