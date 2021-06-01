import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { OkdialogComponent } from 'src/app/pages/dialogs/okdialog/okdialog.component';
import { PublicDataService } from 'src/app/services/public-data.service';
/**
 *class product
 *
 * @export declare the class
 * @class ProductComponent
 * @implements {OnInit} when ap inits
/**
 *Class product
 *
 * @export
 * @class ProductComponent
 * @implements {OnInit} when
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productForm = this.fb.group({
    name: [null, Validators.compose([Validators.required])],
    product_id: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    shop_id: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    image_url: [null],
  });

  public idl!: string;
  public idShop!: string;
  public products: Product[] = [];
  public product!: Product;
  /**
   * constructor
   * @param publicService public data service
   * @param route handles the current url
   * @param router handle navigation
   * @param fb form builder
   * @param dialog dialog
   */
  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  /** when app loads */
  ngOnInit(): void {
    this.idl = this.route.snapshot.paramMap.get('idl') || '';
    this.idShop = this.route.snapshot.paramMap.get('id') || '';
    this.publicService.getproducts().subscribe((data) => {
      this.products = data.data;
      this.products.forEach((res) => {
        if (Number(this.idShop) === Number(res.id)) {
          this.product = res;
          this.productForm.get('name')?.setValue(this.product.name);
          this.productForm.get('product_id')?.setValue(this.product.id);
          this.productForm.get('shop_id')?.setValue(this.product.shop_id);
          this.productForm.get('image_url')?.setValue(this.product.image_url);
        }
      });
    });
  }
  /** when confirm teh from */
  onSubmit() {
    const name = this.productForm.get('name')?.value;
    const product_id = Number(this.productForm.get('product_id')?.value);
    const shop_id = Number(this.productForm.get('shop_id')?.value);
    const image_url = this.productForm.get('image_url')?.value;
    const units = this.product.units;
    this.publicService
      .postproducts(product_id, name, image_url, shop_id, units)
      .subscribe(
        (res) => {
          const content = 'Updated!';
          this.openOkDialog('SUCCESS!', content);
        },
        (error) => {
          const content = 'Error occured when trying to update item!';
          this.openOkDialog('ERROR!', content);
        }
      );
  }
  /**
   *opens the dailog
   *
   * @param {string} title title
   * @param {string} content content
   * @memberof ProductComponent l
   */
  openOkDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
  }
}
