import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/services/models/client.model';

@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent implements OnInit {

  @Input() client: Client;
  @Input() tripName: string;


  constructor(
    private iab: InAppBrowser,
  ) { }

  ngOnInit() { }

  contact(target: string, contact: any) {

    if (target === 'whatsapp') {
      const message = environment.whatsappText.replace('[trip_name]', this.tripName);
      const apiCall = environment.whatsappApi + `?phone=` + contact + `&text=` + message;
      const browser = this.iab.create(apiCall, '_blank');
    }
  }

}
