import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pet-hackaton-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
