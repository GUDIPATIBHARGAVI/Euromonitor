import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { SharedService } from '../customer/share.service';
@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule],
  exports: [ProductComponent],
  providers: [SharedService],
})
export class ProductModule {}
