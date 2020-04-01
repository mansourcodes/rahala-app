import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialService } from 'src/app/services/common/social.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public version = environment.version;
  constructor(private socialService: SocialService) { }

  ngOnInit() {

  }

  feedbackEmail() {

    const email = {
      to: [environment.supportEmail],
      subject: 'الإبلاغ عن خلل',
      body: 'أرغب في الإبلاغ عن خلل',
    };

    this.socialService.callEmail(email);
  }

}
