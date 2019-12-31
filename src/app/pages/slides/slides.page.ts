import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss']
})
export class SlidesPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // TODO: make email related to Device info to make login next installed
    const email = 'guest1@hi.com';
    const password = email;

    this.authService.autoLogin().subscribe(isLogin => {
      if (isLogin) {
        this.router.navigateByUrl('trips');
        return;
      }
      this.authService.login(email, password).subscribe(() => {
        this.router.navigateByUrl('trips');
      });
    });
  }
}
