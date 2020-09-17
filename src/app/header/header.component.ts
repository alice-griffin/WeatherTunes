import { Component } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleNavStatus: boolean = false;

  constructor(private spotifyService: SpotifyService) { }

  toggleNav() {
    let getSidebar = document.querySelector(".nav-sidebar") as HTMLElement;
    let getSidebarUl = document.querySelector(".nav-sidebar ul") as HTMLElement;

    if (this.toggleNavStatus === false) {
        getSidebarUl.style.visibility = "visible";
        getSidebar.style.visibility = "visible";
        getSidebar.style.width = "130px";

        this.toggleNavStatus = true;

    } else {
        getSidebar.style.visibility = "visible";
        getSidebar.style.width = "0px"
        getSidebarUl.style.visibility = "hidden";
        this.toggleNavStatus = false;
    }
}

}
