import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Unsubscribe, onValue, ref } from 'firebase/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string | null;
  cart: any;
  unsubscribe!: Unsubscribe;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    productService.getAll().then(products => {
      this.products = products

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category')
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category ) :
          this.products
      })
    });
  }

  async ngOnInit() {
    let cartRef = await this.cartService.getCartRef()
    this.unsubscribe = onValue(cartRef, (snapshot) => {
      this.cart = new ShoppingCart(snapshot.val().items)
    })  
  }

  ngOnDestroy(): void {
      this.unsubscribe
  }
}
