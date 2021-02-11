import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-list-chart',
  templateUrl: './list-chart.component.html',
  styleUrls: ['./list-chart.component.scss'],
})
export class ListChartComponent implements OnInit, OnChanges {
  @Input()
  dateRange!: any;

  public loading = true;

  public data: {
    name: string;
    value: number;
  }[] = [];

  displayedColumns: string[] = ['name', 'value'];

  constructor(private statisticsService: StatisticsService) {}

  ngOnChanges() {
    console.log('cahnge :/');
    this.updateData();
  }

  async ngOnInit(): Promise<void> {
    console.log('init :/');
    this.updateData();
  }

  private async updateData() {
    this.loading = true;
    const from: Date = new Date(this.dateRange.start);
    const to: Date = new Date(this.dateRange.end);
    to.setDate(to.getDate() + 1);
    const stats = await this.statisticsService.timePerCategoryAccumulative(
      from,
      to
    );
    this.data = stats.data;
    this.loading = false;
  }
}
