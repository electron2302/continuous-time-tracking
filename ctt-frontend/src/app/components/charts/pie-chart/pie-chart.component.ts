import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StatisticsService } from '../../../services/statistics.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input()
  dateRange!: FormGroup;

  public loading = true;

  view: [number, number] = [700, 400];

  public data: {
    name: string;
    value: number;
  }[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  constructor(private statisticsService: StatisticsService) {}

  async ngOnInit(): Promise<void> {
    const stats = await this.statisticsService.timePerCategoryAccumulative(
      this.dateRange.value.start,
      this.dateRange.value.end
    );
    let shit: {
      name: string;
      value: number;
    }[] = [];
    shit = shit.concat(stats.data);
    this.data = shit;
    console.log(shit);
    console.log(this.data);
    this.loading = false;
  }
}
