import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import {DatabaseReference, Query, get, getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { Product } from 'shared/models/product';
import { Observable, defer, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: Database = getDatabase()) {}

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    remove(ref(this.db, "/shopping-carts/" + cartId + '/items'))
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  async getCartRef(): Promise<DatabaseReference>{
    let cartId = await this.getOrCreateCartId()
    return ref(this.db, "/shopping-carts/" + cartId)
  }

  private create() {
    return get(push(ref(this.db, "/shopping-carts"), { dateCreated: new Date().getTime()}))
  }
  
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key || '{}')
    return result.key || ""
  }

  private getItemRef(cartId: string, productId: string) {
    return ref(this.db, "/shopping-carts/" + cartId + '/items/' + productId)
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let itemRef = this.getItemRef(cartId || '', product.$key)
    get(itemRef).then(item => {
      if ((item.val()?.quantity || 0)+ change === 0) remove(itemRef)
      else
      update(itemRef, {
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: (item.val()?.quantity || 0) + change})
    })
  }
}
