import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const root = document.documentElement;
    let theme = sessionStorage.getItem("theme")
    if(theme) {
      let color = JSON.parse(theme) as boolean
      if (!color){
        root.style.setProperty('--front', '#e3df28');
        root.style.setProperty('--supper', '#503146');
        root.style.setProperty('--tsupper', 'rgba(80, 49, 70,0.7)');
        root.style.setProperty('--back', '#1e0c18');
        root.style.setProperty('--text', '#FFFFFF');
        root.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('assets/images/Yellow-Purple.jpg')"

      }else{
        root.style.setProperty('--front', '#00AAFF');
        root.style.setProperty('--supper', '#001242');
        root.style.setProperty('--back', '#000022');
        root.style.setProperty('--tsupper', 'rgba(0, 18, 66,0.7)');
        root.style.setProperty('--text', 'whitesmoke');
        root.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('assets/images/TechBackgorund.png')"

      }
    }
  }
}


