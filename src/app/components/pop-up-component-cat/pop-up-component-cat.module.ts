import { PopUpComponentCatComponent } from './pop-up-component-cat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PopUpComponentCatComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [PopUpComponentCatComponent]
})
export class PopUpModule { }
