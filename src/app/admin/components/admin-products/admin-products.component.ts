import { Component } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  products!: Product[];
  filteredProducts: any;

  constructor(private productService: ProductService) {
    this.productService.getAll().then(p =>{
      this.filteredProducts = this.products = p
    }) 
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }
}
