import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private authService: AuthService) { }

  ngOnInit() {
    let signupData = {
      name: "dode",
      email: "guest" + Math.random() + "@hi.com",
      password: "123123123",
      password_confirmation: "123123123"
    }
    this.authService.signup(signupData).subscribe(arg => {
      console.log(arg)
    });

  }

}
