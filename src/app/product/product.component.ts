import { Component } from '@angular/core';
import { SharedService } from '../customer/share.service';
import { ProductDetails } from './Iproduct-details.model';

@Component({
  selector: 'app-product',
  template: `
    <button (click)="sendProductDetails()">Send Product Details</button>
    <div *ngIf="productDetails">
      <h2>Product Details</h2>
      <p>ID: {{ productDetails.id }}</p>
      <p>Name: {{ productDetails.name }}</p>
      <p>Category: {{ productDetails.category }}</p>
      <p>Price: {{ productDetails.price }}</p>
      <p>Description: {{ productDetails.description }}</p>
    </div>
  `,
})
export class ProductComponent {
  productDetails: ProductDetails | null = null;

  constructor(private sharedService: SharedService) {}

  sendProductDetails(): void {
    this.productDetails = {
      id: 1,
      name: 'Smartphone XYZ',
      category: 'Electronics',
      price: 499.99,
      description: 'A high-performance smartphone with advanced features.',
    };

    this.sharedService.setProductDetails(this.productDetails);
  }
}
