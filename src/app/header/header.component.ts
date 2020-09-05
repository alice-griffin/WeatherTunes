import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleNavStatus: boolean = false;

  constructor() { }

  toggleNav() {
    let getSidebar = document.querySelector(".nav-sidebar") as HTMLElement;
    let getSidebarUl = document.querySelector(".nav-sidebar ul") as HTMLElement;

    if (this.toggleNavStatus === false) {
        getSidebarUl.style.visibility = "visible";
        getSidebar.style.visibility = "visible";
        getSidebar.style.width = "100px";

        this.toggleNavStatus = true;

    } else {
        getSidebar.style.visibility = "visible";
        getSidebar.style.width = "0px"
        getSidebarUl.style.visibility = "hidden";
        this.toggleNavStatus = false;
    }
}
}
