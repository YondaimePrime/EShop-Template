import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  ukaz(category: any){
    let categories = document.getElementsByClassName(category);
    for(let i = 0; i < categories.length; i++)
    {
      categories[i].classList.toggle("visible");
    }
  }

  @Output()
  searchByType = new EventEmitter<String>();
  @Output()
  searchByAdditional = new EventEmitter<String>();

  getProductByType(type?:String, additional?: String):void{
    if(type == undefined){
      this.searchByType.emit();
    }else {
      if(additional==undefined) {
        this.searchByType.emit(type);
        this.searchByAdditional.emit();
      }else{
        this.searchByAdditional.emit(additional);
        this.searchByType.emit(type);
      }
    }
  }

}
