import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/services/providers/clients.service';
import { Client } from 'src/app/services/models/client.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss'],
})
export class ClientDetailPage implements OnInit, OnDestroy {
  client: Client;
  private clientSub: Subscription;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('clientId')) {
        this.navCtrl.navigateBack('/clients');
        return;
      }
      this.clientSub = this.clientsService
        .getClient(paramMap.get('clientId'))
        .subscribe(client => {
          this.client = client;
          this.isLoading = false;
        });
    });
  }


  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }
  }
}
