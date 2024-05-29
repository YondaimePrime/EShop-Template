import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  filter?: String
  router;
  constructor(router: Router) {
    this.router = router
  }
  @Output()
  searchByWord = new EventEmitter<String>();
  filterTerm(word: String){
    this.searchByWord.emit(word)
  }

}
