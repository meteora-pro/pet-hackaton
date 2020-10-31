import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterDateRange } from '../../model/pet-filter';

@Component({
  selector: 'date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent implements ControlValueAccessor {

  constructor(private cdr: ChangeDetectorRef) {}

  @Input() label: string;

  value: FilterDateRange;

  private onChange: Function;
  private onTouched: Function;

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(value: FilterDateRange): void {
    this.value = value || { from: null, to: null };
    this.cdr.markForCheck();
  }

  emitEvent() {
    this.onChange({
      from: normalizeDate(this.value.from),
      to: normalizeDate(this.value.to),
    });
    this.cdr.detectChanges();
  }

}

function normalizeDate(date: string) {
  return date
    ? new Date(this.value.to).toISOString()
    : null
}
