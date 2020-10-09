import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselector-dropdown',
  templateUrl: './multiselector-dropdown.component.html',
  styleUrls: ['./multiselector-dropdown.component.css']
})
export class MultiselectorDropdownComponent implements OnInit {

  @Output() notifyRegions: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  selectedPills: Array<string>;

  constructor() {
    this.selectedPills = new Array<string>();
  }

  ngOnInit(): void {
  }

  onSendRegions(): void {
    this.notifyRegions.emit(this.selectedPills);
  }

  onCheck(event: Event): void {

    if ((<HTMLInputElement>event.target).checked && !this.exists((<HTMLInputElement>event.target).name)) {
      this.selectedPills.push((<HTMLInputElement>event.target).name);
    }
    if (!(<HTMLInputElement>event.target).checked) {
      this.remove((<HTMLInputElement>event.target).name);
    }
  }

  private exists(name: string): boolean {
    for (let i = 0; i < this.selectedPills.length; i++) {
      if (this.selectedPills[i] === name) {
        return true;
      }
    }
    return false;
  }

  private remove(value: string) {
    for (var i = 0; i < this.selectedPills.length; i++) {
      if (this.selectedPills[i] === value) {
        this.selectedPills.splice(i, 1);
      }
    }
  }
}
