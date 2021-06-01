import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PublicDataService } from 'src/app/services/public-data.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
/**
 * component declaration
 */
@Component({
  selector: 'app-sid-bar',
  templateUrl: './sid-bar.component.html',
  styleUrls: ['./sid-bar.component.scss'],
})
export class SidBarComponent implements OnInit {
  /** to hide elements from no logged in users */
  public enabled = false;
  /** where to save access token */
  public token: string = '';
  /** to handle Menu  */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  /** name of user */
  public name: string = '';

  /**
   * constructor
   * @param breakpointObserver handle the change of screen size
   * @param router handles the navigation
   * @param user user service
   * @param publicData publi data service
   * @param location handl the location like reload website
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public user: UserService,
    private publicData: PublicDataService,
    private location: Location
  ) {
    this.name = localStorage.getItem('name') || '';
  }

  ngOnInit(): void {
    this.checkPermission();
  }

  checkPermission() {
    let user: any;
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      this.enabled = false;
    } else {
      this.user.checkLoggedIn(this.token).subscribe((res) => {
        user = res;
        if (user.id > 0) {
          this.enabled = true;
        } else {
          this.enabled = false;
        }
      });
    }
  }
  goBack() {
    this.location.back();
  }

  logOut() {
    this.user.putLogOut().subscribe((res) => {
      this.router.navigateByUrl('/login');

      localStorage.clear();
    });
  }
}
