import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  range: FormGroup;

  constructor() {
    const toDay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const oneWeekBefor = new Date(toDay);
    oneWeekBefor.setDate(oneWeekBefor.getDate() - 7);

    this.range = new FormGroup({
      start: new FormControl(oneWeekBefor),
      end: new FormControl(toDay),
    });
  }
  ngOnInit(): void {}
}
