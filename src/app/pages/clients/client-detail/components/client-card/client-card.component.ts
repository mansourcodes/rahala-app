import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/services/models/client.model';
import { SocialService } from 'src/app/services/common/social.service';
import { CleintContactInterface } from 'src/app/services/models/clientcontact.model';


@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent implements OnInit {
  @Input() client: Client;
  @Input() tripName: string;
  socialServ: SocialService

  constructor(
    private socialService: SocialService
  ) {
    this.socialServ = socialService;
  }

  ngOnInit() { }

  mainClick(contactDetails: CleintContactInterface) {
    if (contactDetails.actionLabel.length === 1) {
      this.socialServ.callClient(contactDetails, 0);
    }
  }

}
