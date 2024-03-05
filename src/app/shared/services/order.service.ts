import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { equalTo, get, getDatabase, orderByChild, push, query, ref } from 'firebase/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: Database = getDatabase(), private cartService: ShoppingCartService) { }

  async placeOrder(order: any) {
    let result = await get(push(ref(this.db, '/orders'), order))
    this.cartService.clearCart()
    return result
  }

  getOrders() {
    return get(ref(this.db, '/orders'))
  }

  getOrdersbyUser(userId: string) {
    return get(query(ref(this.db, '/orders'), orderByChild('userId'), equalTo(userId)))
  }
}
