import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input()
  dateRange!: any;

  public loading = true;

  view: [number, number] = [700, 400];

  public data: {
    name: string;
    value: number;
  }[] = [];

  colorScheme: {
    domain: string[];
  } = { domain: [] };

  constructor(private statisticsService: StatisticsService) {}

  public ngOnChanges(_: SimpleChanges): void {
    this.updateData();
  }

  async ngOnInit(): Promise<void> {
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
    this.colorScheme.domain = stats.colors;
    this.loading = false;
  }
}
