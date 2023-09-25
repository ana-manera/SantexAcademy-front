import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { CommunicationService } from 'src/app/core/services/communication/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private breakpointObserver: BreakpointObserver
  ) {
   // this.userData = this.authenticationService.user;
  }
  ngOnInit(): void {}

  logOut(): void {
    console.log('Logout');
   // this.authenticationService.logOut(true);
  }
  toggle(): void {
    this.isOpen = !this.isOpen;
    this.communicationService.sendNewEvent('headerToNavIsOpen', this.isOpen);
  }
}
