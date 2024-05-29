import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent {
  filterTerm!: String;
  @Output()
  searchByWord = new EventEmitter<String>();

  search(){
    this.searchByWord.emit(this.filterTerm)
  }

  caregory(){
    document.getElementsByClassName("categories")[0].classList.toggle("categoriestranslation")
    document.getElementsByClassName("barIcon")[0].classList.toggle("invisible")
    document.getElementsByClassName("barIcon")[1].classList.toggle("invisible")
  }
}
