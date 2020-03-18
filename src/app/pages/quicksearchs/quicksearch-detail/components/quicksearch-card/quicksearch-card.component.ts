import { Component, OnInit, Input } from '@angular/core';
import { Quicksearch } from 'src/app/services/models/quicksearch.model';

@Component({
  selector: 'quicksearch-card',
  templateUrl: './quicksearch-card.component.html',
  styleUrls: ['./quicksearch-card.component.scss'],
})
export class QuicksearchCardComponent implements OnInit {
  @Input() quicksearch: Quicksearch;


  constructor() { }

  ngOnInit() { }


}
