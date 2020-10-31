import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'attribute-status',
  templateUrl: './attribute-status.component.html',
  styleUrls: ['./attribute-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeStatusComponent {

  @Input()
  value: boolean;

  @Input()
  successTitle: string;

  @Input()
  dangerTitle: string;
}
