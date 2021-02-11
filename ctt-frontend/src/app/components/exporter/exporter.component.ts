import { Component, Input, OnInit } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Category, Activity } from '../../../models';
import * as fs from 'fs';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements OnInit {
  @Input() path = '';

  constructor() { }

  ngOnInit(): void {
  }

  async exportToJson(path: string): Promise<void> {
    let result = '';
    await DataStore.query(Category).then((resultCategories) => {
      result += JSON.stringify(resultCategories);
    });
    await DataStore.query(Activity).then((resultActivities) => {
      result += JSON.stringify(resultActivities);
    });
    fs.writeFileSync(path, result);
  }
}
