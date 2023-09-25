
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { CommunicationService } from 'src/app/core/services/communication/communication.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public navItems: any = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  @ViewChild('drawer') public drawer!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private communicationService: CommunicationService,
  ) {
  }

  ngOnInit(): void {
    this.communicationService.events$.subscribe((e) => {
      if (e.name === 'headerToNavIsOpen') {
        this.drawer.toggle();
      }
    });
  }
  drawerToggle() {
    if (this.drawer.mode === 'over') {
      this.drawer.toggle();
    }
  }
}
