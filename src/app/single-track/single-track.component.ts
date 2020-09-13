import { Component, OnInit, Input } from '@angular/core';

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

}
