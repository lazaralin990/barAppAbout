import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string = '/assets/img/logo.png';


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignOut(){

  }

}
