import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-mid',
  templateUrl: './nav-mid.component.html',
  styleUrls: ['./nav-mid.component.css']
})
export class NavMidComponent {
  router;
constructor(router: Router) {
  this.router = router;
}
refresh(){
  window.location.replace("/")
}
}
