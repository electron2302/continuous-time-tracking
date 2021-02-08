import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-change-activity',
  templateUrl: './change-activity.component.html',
  styleUrls: ['./change-activity.component.scss'],
})
export class ChangeActivityComponent implements OnInit {
  constructor(
    private activityService: ActivityService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}
}
