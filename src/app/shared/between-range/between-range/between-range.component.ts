import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-between-range',
  templateUrl: './between-range.component.html',
  styleUrls: ['./between-range.component.css']
})
export class BetweenRangeComponent implements OnChanges {

  @Output() notifyPopulationRange: EventEmitter<number[]> = new EventEmitter<number[]>();

  maxPopulation: number;
  minPopulation: number;


  constructor() { }

  ngOnChanges(): void {
  }

  onSendRange(): void {
    this.notifyPopulationRange.emit([this.minPopulation, this.maxPopulation]);
  }
}
