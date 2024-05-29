import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-specific-params',
  templateUrl: './product-specific-params.component.html',
  styleUrls: ['./product-specific-params.component.css']
})
export class ProductSpecificParamsComponent {
  genParams?:any

  @Input()
  set generalParams(genParams: any){
    this.genParams = genParams;
  }

  checkType(): String{
    if(this.genParams != undefined){
      document.getElementById("genParam")!.style.display="none"
      return this.genParams.type
    }else{
      return "NoTypeSelected"
    }
  }


}
