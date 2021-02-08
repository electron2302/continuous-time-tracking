import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  Color,
  stringInputToObject,
} from '@angular-material-components/color-picker';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import {
  getDisplayText,
  iterateStatisticTypes,
  StatisticType,
} from '../../interfaces/statistics';

interface StatisticTypeSelect {
  id: StatisticType;
  selected: boolean;
  name: string;
}

const globalIntervalValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const intervalError = { intervalNoInt: true };
  const reminderIntervalCtrl = control.get('reminderInterval');
  const reminderEnabledCtrl = control.get('reminderEnabled');
  if (reminderEnabledCtrl?.value) {
    if (Number.isInteger(reminderIntervalCtrl?.value)) {
      reminderIntervalCtrl?.setErrors(null);
      return null;
    } else {
      reminderIntervalCtrl?.setErrors(intervalError);
      return intervalError;
    }
  } else {
    reminderIntervalCtrl?.setErrors(null);
    return null;
  }
};

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public category: Category = {
    color: '#00d5ff',
    id: 'new',
    name: '',
    excludeFromStatistics: [],
    reminderInterval: 30,
    version: 1
  };

  public statisticTypeSelectEntries: StatisticTypeSelect[] = [];

  public categoryForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      reminderEnabled: new FormControl(null, [Validators.required]),
      reminderInterval: new FormControl(null, []),
      // and statisticsInclude${StatisticType} e.g. statisticsInclude0, ...
    },
    { validators: [globalIntervalValidator] }
  );

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    iterateStatisticTypes((s: StatisticType) => {
      this.statisticTypeSelectEntries.push({
        id: s,
        selected: false,
        name: getDisplayText(s),
      });
      this.categoryForm.addControl(
        `statisticsInclude${s}`,
        new FormControl(false, [])
      );
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        await this.getExistingCategory(id);
      } else {
        this.updateFormControl();
      }
    });
  }

  public async onSave(): Promise<void> {
    if (this.isNew()) {
      this.saveNewCategory();
    } else {
      this.saveExistingCategory();
    }
  }

  public onBackClicked(): void {
    this.router.navigate(['']);
  }

  public isNew(): boolean {
    return this.category.id === 'new';
  }

  public get nameCtl(): AbstractControl {
    return this.getControl('name');
  }

  public get colorCtl(): AbstractControl {
    return this.getControl('color');
  }

  public get reminderIntervalCtl(): AbstractControl {
    return this.getControl('reminderInterval');
  }

  public get reminderEnabledCtl(): AbstractControl {
    return this.getControl('reminderEnabled');
  }

  private get excludeFromStatisticsInCtl(): StatisticType[] {
    const result: StatisticType[] = [];
    iterateStatisticTypes((s) => {
      if (!this.categoryForm.get(`statisticsInclude${s}`)?.value) {
        result.push(s);
      }
    });
    return result;
  }

  private updateFormControl(): void {
    const value: any = {};
    iterateStatisticTypes((s) => {
      value[
        `statisticsInclude${s}`
      ] = !this.category.excludeFromStatistics.includes(s.valueOf());
    });
    this.categoryForm.setValue({
      name: this.category.name,
      color: this.hexToColor(this.category.color),
      reminderInterval: this.category.reminderInterval,
      reminderEnabled: this.category.reminderInterval > 0,
      ...value,
    });
  }

  private updateCategory(): void {
    this.category.name = this.nameCtl.value;
    this.category.color = `#${this.colorCtl.value.toHex()}`;
    this.category.reminderInterval = this.reminderEnabledCtl.value
      ? this.reminderIntervalCtl.value
      : 0;
    this.category.excludeFromStatistics = this.excludeFromStatisticsInCtl;
  }

  private async getExistingCategory(id: string): Promise<void> {
    try {
      this.category = await this.categoryService.getById(id);
      this.updateFormControl();
    } catch (error) {
      this.handleError(error, 'Category not found');
      this.router.navigate(['category/new']);
    }
  }

  private async saveNewCategory(): Promise<void> {
    this.updateCategory();
    try {
      const newCategory = await this.categoryService.create(this.category);
      this.snackBar.open('New category saved', undefined, { duration: 3000 });
      this.router.navigate([`category/${newCategory.id}`]);
    } catch (error) {
      this.handleError(error, 'Failed to save new category');
    }
  }

  private async saveExistingCategory(): Promise<void> {
    this.updateCategory();
    try {
      await this.categoryService.update(this.category);
      this.snackBar.open('Saved changes', undefined, { duration: 3000 });
    } catch (error: any) {
      this.handleError(error, 'Failed to save changes');
    }
  }

  private hexToColor(hex: string): Color {
    const object = stringInputToObject(hex);
    return new Color(object.r, object.g, object.b, object.a);
  }

  private handleError(error: any, snackBarMessage: string): void {
    console.error(error);
    this.snackBar.open(snackBarMessage, undefined, {
      duration: 3000,
    });
  }

  private getControl(controlName: string): AbstractControl {
    const control = this.categoryForm.get(controlName);
    if (control) {
      return control;
    } else {
      throw new Error(`Could not find control with name ${controlName}`);
    }
  }
}
