import { Component, Input } from '@angular/core';

@Component({
  selector: 'option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.scss'],
})
export class OptionCardComponent {

  @Input() optionIcon: string;
  @Input() optionLabel: string;
  @Input() optionValue: string[];

  constructor() { }



}
