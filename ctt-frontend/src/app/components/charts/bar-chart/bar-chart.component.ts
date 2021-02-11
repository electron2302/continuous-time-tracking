import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('container') container?: ElementRef;

  @Input()
  dateRange!: any;

  public loading = true;

  public data: {
    name: string;
    value: number;
  }[] = [];

  public view: [number, number] = [-1, -1];

  public colorScheme: {
    domain: string[];
  } = { domain: [] };

  constructor(
    private statisticsService: StatisticsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngOnChanges(): void {
    this.updateData();
  }

  public ngOnInit(): void {
    this.updateData();
  }

  public onResize(): void {
    this.view = [
      this.container?.nativeElement.offsetWidth,
      this.container?.nativeElement.offsetHeight,
    ];
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
    this.changeDetector.detectChanges();
    this.onResize();
  }
}
