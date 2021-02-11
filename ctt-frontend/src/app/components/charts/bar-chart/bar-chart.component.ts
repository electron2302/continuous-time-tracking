import { Component, Input, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input()
  dateRange!: any;

  public loading = true;

  public data: {
    name: string;
    value: number;
  }[] = [];

  view: [number, number] = [700, 400];

  // options
  showXAxisLabel = true;
  xAxisLabel = 'Country';

  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: {
    domain: string[];
  } = { domain: [] };

  constructor(private statisticsService: StatisticsService) {}

  ngOnChanges() {
    console.log('cahnge :/');
    this.UpdateData();
  }

  async ngOnInit(): Promise<void> {
    console.log('init :/');
    this.UpdateData();
  }

  private async UpdateData() {
    this.loading = true;
    const from: Date = new Date(this.dateRange.start);
    const to: Date = new Date(this.dateRange.end);
    to.setDate(to.getDate() + 1);
    const stats = await this.statisticsService.timePerCategoryAccumulative(
      from,
      to
    );
    this.data = stats.data;
    this.colorScheme.domain = stats.colors;
    this.loading = false;
  }
}
