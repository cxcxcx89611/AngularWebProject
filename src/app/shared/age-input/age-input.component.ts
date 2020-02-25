import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import {subDays, subMonths, subYears, differenceInDays, differenceInMonths,
  differenceInYears, isBefore, parse, format} from 'date-fns';
import {isValidDate} from '../../utils/data.utils';
import {Subscription} from 'rxjs/Subscription';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AgeInputComponent),
    multi: true
  },
    {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AgeInputComponent),
    multi: true
}]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  selectedUnit = AgeUnit.Year;
  sub: Subscription;
  ageUnits = [
    {value: AgeUnit.Year, label: 'year'},
    {value: AgeUnit.Month, label: 'month'},
    {value: AgeUnit.Day, label: 'day'}
  ];
  form: FormGroup;
  private propagateChage = (_: any) => {};

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dataOfBirthInvalid: true
    }
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : { birthdayInvaid: true };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit  = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearTop;
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChage = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  constructor(private fb: FormBuilder) { }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');
    const birthday$ = birthday.valueChanges.map(d => {
      return { date: d, from: 'birthday'};
    }).debounceTime(300).distinctUntilChanged().filter(_ => birthday.valid) ;
    const ageNum$ = ageNum.valueChanges.startWith(ageNum.value).debounceTime(300).distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.startWith(ageUnit.value).debounceTime(300).distinctUntilChanged();

    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).map(d => {
      return {date: d, from: 'age'};
    }).filter(_ => this.form.get('age').valid);

    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {emitEvent: false});
        }
        this.propagateChage(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChage(d.date);
        }
      }
    });
  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      {age: differenceInDays(now, date), unit: AgeUnit.Day}
      : isBefore(subMonths(now, this.monthsTop), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
        {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        }
  }
  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
    }
  }
}
