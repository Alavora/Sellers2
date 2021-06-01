import { Basket } from 'src/app/models/basket';
import { Unit } from './../../../../models/unit';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/items';
import { PublicDataService } from 'src/app/services/public-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OkdialogComponent } from 'src/app/pages/dialogs/okdialog/okdialog.component';
/**
 * interface to show Status as select option
 */
export interface Status {
  id: string;
  value: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public basketId!: string;
  public basketItems: Basket[] = [];
  public item!: Basket;
  public items: Basket[] = [];
  public itemId: string = '';
  selectedUnit!: number;
  units: Unit[] = [];
  status: Status[] = [
    { id: '0', value: 'UNCONFIRMED' },
    { id: '1', value: 'CONFIRMED' },
    { id: '2', value: 'PREPARING' },
    { id: '3', value: 'READY' },
  ];
  /**
  constructor(
   *
   * @param publicService the is a service that handles our api request
   * @param route will handle navigation to other url
   *  @param router  will handle the extraction of element id string... from url
   */
  /**
   * Creates an instance of DetailsComponent.
   * @param {PublicDataService} publicService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {FormBuilder} fb
   * @param {MatDialog} dialog
   * @memberof DetailsComponent
   */
  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  /**
   *from control builder
   *
   * @memberof DetailsComponent
   */
  itemsForm = this.fb.group({
    quantity: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    product_id: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    itemid: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    unit_id: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
    status: [
      null,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')]),
    ],
  });

  /**
   *when app loads
   *
   * @memberof DetailsComponent
   */
  ngOnInit(): void {
    this.publicService.getUnits().subscribe((res) => {
      this.units = res;
    });
    this.getItem();
  }
  /**
   *get data from back-end
   *
   * @memberof DetailsComponent
   */
  public getItem() {
    this.basketId = this.route.snapshot.paramMap.get('idbasket') || '';
    this.itemId = this.route.snapshot.paramMap.get('id') || '';
    const id = Number(this.basketId);
    this.publicService.getBasket(id).subscribe((data) => {
      this.basketItems = data.data;
      this.basketItems.forEach((element) => {
        if (Number(element.id) === Number(this.itemId)) {
          this.item = element;
          console.log(this.item);
          this.itemsForm.get('product_id')?.setValue(element.product_id);
          this.itemsForm.get('quantity')?.setValue(element.quantity);
          this.itemsForm.get('itemid')?.setValue(element.id);
          this.itemsForm.get('unit_id')?.setValue(element.unit_id);
          this.itemsForm.get('status')?.setValue(element.status);
        }
      });
      console.log(this.basketItems);
    });
  }
  /** when the user confirm  */
  onSubmit() {
    console.log(this.itemsForm.get('unit_id')?.value);
    console.log(this.itemsForm.get('status')?.value);
    const id = Number(this.basketId);

    const product_id = Number(this.itemsForm.get('product_id')?.value);
    const quantity = this.itemsForm.get('quantity')?.value;
    const itemid = Number(this.itemsForm.get('itemid')?.value);
    const unit_id = Number(this.itemsForm.get('unit_id')?.value);
    const status = this.itemsForm.get('status')?.value;

    this.item.product_id = product_id;
    this.item.quantity = quantity;
    this.item.id = itemid;
    this.item.unit_id = unit_id;
    this.item.status = status;
    this.publicService
      .postItems(itemid, quantity, product_id, unit_id, status)
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
   * to open a dialog shows different message ! depends on the situation
   * @param title the title of dialog
   * @param content teh content
   */
  openOkDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
  }
  /**
   *return sthe data as readable text
   *
   * @param {string} str
   * @return {*}  {string}
   * @memberof DetailsComponent
   */
  getStatusString(str: string): string {
    let response = '';
    switch (str) {
      case '0':
        response = 'UNCONFIRMED';
        break;
      case '1':
        response = 'CONFIRMED';
        break;
      case '2':
        response = 'PREPARING';
        break;
      case '3':
        response = 'READY';
        break;

      default:
        break;
    }
    return response;
  }
}
