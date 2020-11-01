import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { OrderEntity } from '@pet-hackaton/types';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  displayedColumns: string[] = ['fullName', 'phone', 'petName', 'shelter'];

  isLoading = true;

  orders$: Observable<OrderEntity[]>

  ngOnInit() {
    this.orders$ = this.http.get<OrderEntity[]>(`${this.apiUrl}/orders`).pipe(
      tap((v) => {
        this.isLoading = false;
      }),
    );
  }
}
