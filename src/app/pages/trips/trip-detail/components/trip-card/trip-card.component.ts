import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/services/models/trip.model';

@Component({
  selector: 'trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {

  @Input() trip: Trip;

  constructor() { }

  ngOnInit() { }

}
