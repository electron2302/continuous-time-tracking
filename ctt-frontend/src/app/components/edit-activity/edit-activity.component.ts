import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Activity } from '../../interfaces/activity';
import { Category } from '../../interfaces/category';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss'],
})
export class EditActivityComponent implements OnInit {
  public activity: Activity = {
    id: 'new',
    categoryID: 'new',
    from: new Date(),
    version: 1,
  };

  public categories: Category[] = [];

  public loading = true;

  public activityForm = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    from: new FormControl(new Date(), [Validators.required]),
  });

  constructor(
    private categoryService: CategoryService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getAll();
    this.categoryService
      .allAsObservable()
      .subscribe((next) => (this.categories = next));
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        await this.getExistingActivity(id);
      } else {
        this.updateFormControl();
      }
      this.loading = false;
    });
  }

  public async onSave(): Promise<void> {
    this.loading = true;
    if (this.isNew()) {
      this.saveNewActivity();
    } else {
      this.saveExistingActivity();
    }
    this.loading = false;
  }

  public onBackClicked(): void {
    this.router.navigate(['']);
  }

  public isNew(): boolean {
    return this.activity.id === 'new';
  }

  public get fromCtl(): AbstractControl {
    return this.getControl('from');
  }

  public get categoryCtl(): AbstractControl {
    return this.getControl('category');
  }

  private updateFormControl(): void {
    this.activityForm.setValue({
      from: this.activity.from,
      category:
        this.activity.categoryID === 'new' ? null : this.activity.categoryID,
    });
  }

  private updateActivity(): void {
    this.activity.from = this.fromCtl.value;
    this.activity.categoryID = this.categoryCtl.value;
  }

  private async getExistingActivity(id: string): Promise<void> {
    try {
      this.activity = await this.activityService.getById(id);
      this.updateFormControl();
    } catch (error) {
      this.handleError(error, 'Activity not found');
      this.router.navigate(['activity/new']);
    }
  }

  private async saveNewActivity(): Promise<void> {
    this.updateActivity();
    try {
      const newActivity = await this.activityService.create(this.activity);
      this.snackBar.open('New activity saved', undefined, { duration: 3000 });
      this.router.navigate([`activity/${newActivity.id}`]);
    } catch (error) {
      this.handleError(error, 'Failed to save new activity');
    }
  }

  private async saveExistingActivity(): Promise<void> {
    this.updateActivity();
    try {
      await this.activityService.update(this.activity);
      this.snackBar.open('Saved changes', undefined, { duration: 3000 });
    } catch (error: any) {
      this.handleError(error, 'Failed to save changes');
    }
  }

  private handleError(error: any, snackBarMessage: string): void {
    console.error(error);
    this.snackBar.open(snackBarMessage, undefined, {
      duration: 3000,
    });
  }

  private getControl(controlName: string): AbstractControl {
    const control = this.activityForm.get(controlName);
    if (control) {
      return control;
    } else {
      throw new Error(`Could not find control with name ${controlName}`);
    }
  }
}
