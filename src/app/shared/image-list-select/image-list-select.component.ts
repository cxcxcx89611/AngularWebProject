import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
]
})
export class ImageListSelectComponent implements ControlValueAccessor  {

  @Input() title = 'options';
  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';
  selected: string;

  private propagateChange = ( _: any) => {};
  constructor() { }
  onChange(i) {
     this.selected = this.items[i];
     this.propagateChange(this.selected);
  }
  writeValue(obj: any): void {
    this.selected = obj;
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }
}
