import { Component } from '@angular/core';

@Component({
  selector: 'app-journalfooter',
  templateUrl: './journalfooter.component.html',
  styleUrls: ['./journalfooter.component.scss']
})
export class JournalfooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {}
}
