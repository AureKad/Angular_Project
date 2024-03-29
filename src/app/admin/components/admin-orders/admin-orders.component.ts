import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: any;

  constructor(private orderService: OrderService) { 
    orderService.getOrders().then(orders => this.orders = orders.val());
  }
}
