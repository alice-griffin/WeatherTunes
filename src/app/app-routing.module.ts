import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  //{ path: "**", redirectTo: "home" },
  { path: "home", component: HomepageComponent },
  { path: "about", component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
