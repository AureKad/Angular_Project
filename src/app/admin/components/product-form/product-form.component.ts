import { Component } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'shared/models/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  categories$;
  product!: Product
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getAll()

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).then(p => this.product = p)
  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    this.productService.delete(this.id)
    this.router.navigate(['/admin/products'])
  }
  
}
