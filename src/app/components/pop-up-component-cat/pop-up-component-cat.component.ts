import { Component, Input } from '@angular/core';
import { openCloseAnimation, openCloseShadeAnimation } from './animations';

@Component({
  selector: 'app-pop-up-component-cat',
  templateUrl: './pop-up-component-cat.component.html',
  styleUrls: ['./pop-up-component-cat.component.css'],
  animations: [
    openCloseAnimation,
    openCloseShadeAnimation,
  ]
})



export class PopUpComponentCatComponent {

  @Input() isOpen = false;

}


