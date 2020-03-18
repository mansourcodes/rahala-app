import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { LaravelResponseMeta } from 'src/app/services/models/LaravelResponseMeta.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Quicksearch } from 'src/app/services/models/quicksearch.model';
import { QuicksearchsService } from 'src/app/services/providers/quicksearchs.service';



@Component({
  selector: 'app-quicksearchs',
  templateUrl: './quicksearchs.page.html',
  styleUrls: ['./quicksearchs.page.scss'],
})
export class QuicksearchsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  isLoading = true;
  loadedQuicksearchs: Quicksearch[];
  relevantQuicksearchs: Quicksearch[];
  listMeta: LaravelResponseMeta;

  private quicksearchsSub: Subscription;
  private listMetaSub: Subscription;



  constructor(
    private quicksearchService: QuicksearchsService,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.quicksearchsSub = this.quicksearchService.quicksearchs.subscribe(quicksearchs => {
      this.loadedQuicksearchs = quicksearchs;
      this.relevantQuicksearchs = this.loadedQuicksearchs;
    });


    this.listMetaSub = this.quicksearchService.meta.subscribe(meta => {
      this.listMeta = meta;
    });
  }



  ionViewWillEnter() {
    this.isLoading = true;
    const query = { page: this.listMeta.currentPage };
    this.quicksearchService.fetchQuicksearchs(query).subscribe(() => {
      this.isLoading = false;
    });
  }

  loadMoreQuicksearchs(event) {
    const query = { page: this.listMeta.currentPage };
    this.quicksearchService.fetchQuicksearchs(query).subscribe(resMeta => {
      event.target.complete();

      if (this.listMeta.currentPage === this.listMeta.lastPage) {
        event.target.disabled = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.quicksearchsSub) {
      this.quicksearchsSub.unsubscribe();
    }
    if (this.listMetaSub) {
      this.listMetaSub.unsubscribe();
    }
  }


}
