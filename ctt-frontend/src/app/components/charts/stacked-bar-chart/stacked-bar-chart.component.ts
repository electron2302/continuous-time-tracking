import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent implements OnInit {
  view: [number, number] = [700, 400];
  data = [
    {
      name: '2020.02.04',
      series: [
        {
          name: 'Sleep',
          value: 6,
        },
        {
          name: 'Code',
          value: 12,
        },
        {
          name: 'Play',
          value: 6,
        },
      ],
    },

    {
      name: '2020.02.05',
      series: [
        {
          name: 'Sleep',
          value: 4,
        },
        {
          name: 'Code',
          value: 12,
        },
        {
          name: 'Play',
          value: 8,
        },
      ],
    },

    {
      name: '2020.02.06',
      series: [
        {
          name: 'Sleep',
          value: 8,
        },
        {
          name: 'Code',
          value: 10,
        },
        {
          name: 'Play',
          value: 4,
        },
      ],
    },
  ];

  // options
  showLegend = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  constructor() {}

  ngOnInit(): void {}
}
