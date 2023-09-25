import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isSidenavOpen = false;
  constructor() {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
