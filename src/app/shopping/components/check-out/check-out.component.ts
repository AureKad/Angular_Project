import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Unsubscribe, onValue } from 'firebase/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart!: ShoppingCart;
  unsubscribe!: Unsubscribe;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    let cartRef = await this.cartService.getCartRef()
    this.unsubscribe = onValue(cartRef, cart => {
      this.cart = new ShoppingCart(cart.val().items)
    })
  }

  ngOnDestroy() {
    this.unsubscribe
  }
  

}
