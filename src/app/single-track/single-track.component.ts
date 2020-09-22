import { Component, OnInit, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {


  @Input() track: any;
  

  constructor() { }

  ngOnInit(): void {
    
  }

}
