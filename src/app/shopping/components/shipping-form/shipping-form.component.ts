import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart;
  shipping = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: ""
  }; 
  userId: string | undefined;
  userSubscribtion!: Subscription

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    ) {}

  ngOnInit() {
    this.userSubscribtion = this.authService.user$.subscribe(user => this.userId = user?.uid)
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe()
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['order-success', result.key])
  }    
}
