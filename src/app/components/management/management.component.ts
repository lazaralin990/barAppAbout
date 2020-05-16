import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private activatedActivated: ActivatedRoute) { }
  mode = this.activatedActivated.snapshot.queryParams['mode'];


  ngOnInit() {
  }

}
