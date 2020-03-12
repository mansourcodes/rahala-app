import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/services/models/client.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss'],
})
export class ClientCardComponent implements OnInit {

  @Input() client: Client;
  @Input() tripName: string;


  constructor(
  ) { }

  ngOnInit() { }

  callClient(bindFunction, index: number) {
    bindFunction[index].apply();
  }

}
