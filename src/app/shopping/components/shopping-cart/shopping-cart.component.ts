import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { onValue } from 'firebase/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  cart: any; 

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    let cartRef = await this.cartService.getCartRef()
    onValue(cartRef, (snapshot) => {
      this.cart = new ShoppingCart(snapshot.val().items)
    })  
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
