import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { LaravelResponseMeta } from 'src/app/services/models/LaravelResponseMeta.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/services/models/client.model';
import { ClientsService } from 'src/app/services/providers/clients.service';
import { CleintContactInterface } from 'src/app/services/models/clientcontact.model';
import { SocialService } from 'src/app/services/common/social.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  loadedClients: Client[];
  relevantClients: Client[];
  listMeta: LaravelResponseMeta;

  private clientsSub: Subscription;
  private listMetaSub: Subscription;



  constructor(
    private clientService: ClientsService,
    private soicalService: SocialService,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.clientsSub = this.clientService.clients.pipe(

      map(clients => {
        function chunk(array, chunkSize: number) {
          const temporal = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            temporal.push(array.slice(i, i + chunkSize));
          }
          return temporal;
        }
        clients = chunk(clients, 1);
        return clients;
      })

    ).subscribe(clients => {
      this.loadedClients = clients;
      this.relevantClients = this.loadedClients;
    });


    this.listMetaSub = this.clientService.meta.subscribe(meta => {
      this.listMeta = meta;
    });
  }



  ionViewWillEnter() {
    this.isLoading = true;
    const query = { page: this.listMeta.currentPage };
    this.clientService.fetchClients(query).subscribe(() => {
      this.isLoading = false;
    });
  }

  loadMoreClients(event) {
    const query = { page: this.listMeta.currentPage };
    this.clientService.fetchClients(query).subscribe(resMeta => {
      event.target.complete();

      if (this.listMeta.currentPage === this.listMeta.lastPage) {
        event.target.disabled = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.clientsSub) {
      this.clientsSub.unsubscribe();
    }
    if (this.listMetaSub) {
      this.listMetaSub.unsubscribe();
    }
  }

  quickContact(contact: CleintContactInterface) {
    this.soicalService.callClient(contact, 0);
  }


}
