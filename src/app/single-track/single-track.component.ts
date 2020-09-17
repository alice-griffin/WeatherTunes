import { Component, OnInit, Input } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {

  track: any;
  @Input() child: any;
  

  constructor() { }

  ngOnInit(): void {
  }

  // playPreview() {
  //   let preview = document.getElementById('player') as HTMLMediaElement;
  //   preview.play();
  // }

  // stopPreview() {
  //   let preview = document.getElementById('player') as HTMLMediaElement;
  //   preview.pause();
  //   preview.currentTime = 0;
  // }
}
