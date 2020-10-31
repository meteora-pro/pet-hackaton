import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterNumberRange } from '../../model/pet-filter';

@Component({
  selector: 'number-range',
  templateUrl: './number-range.component.html',
  styleUrls: ['./number-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberRangeComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberRangeComponent implements ControlValueAccessor {

  @Input() label: string;

  value: FilterNumberRange;

  private onChange: Function;
  private onTouched: Function;

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(value: FilterNumberRange): void {
    this.value = value || {from: null, to: null};
  }

  emitEvent() {
    this.onChange(this.value);
  }
}
