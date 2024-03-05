import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { child, get, getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: Database = getDatabase()) { }
  
  create(product: any) {
    return push(ref(this.db, "/products"), product)
  }

  getAll(): Promise<Product[]> {
    return get(ref(this.db, "/products")).then(snapshot => {
      return this.convertToArray(snapshot.val())
    })
  }

  getProduct(productId: string): Promise<Product> {
    return get(child(ref(this.db), '/products/' + productId)).then((product) => {
      return this.addKeyToProduct(product.val(), productId)
  })
  }

  update(productId:string, product:any) {
    return update(child(ref(this.db), '/products/' + productId), product)
  }

  delete(productId: string | null) {
    return remove(child(ref(this.db), '/products/' + productId))
  }

  convertToArray(productMap: { [productId: string]: Product}) {
    let products: Product[] = []
    Object.entries(productMap).forEach(product => {
      product[1] = this.addKeyToProduct(product[1], product[0])
      products.push(product[1])
    })
    return products
  }

  addKeyToProduct(product: Product, key: string) {
    product.$key = key
    return product
  }

}
