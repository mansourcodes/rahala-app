import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/services/models/client.model';

@Component({
  selector: 'client-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  @Input() client: Client;
  @Input() type: string;

  constructor() { }

  ngOnInit() { }

}
