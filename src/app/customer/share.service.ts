import { Injectable } from '@angular/core';
import { ProductDetails } from '../product/Iproduct-details.model';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private productDetails: ProductDetails | null = null;

  setProductDetails(details: ProductDetails): void {
    this.productDetails = details;
  }

  getProductDetails(): ProductDetails | null {
    return this.productDetails;
  }
}
