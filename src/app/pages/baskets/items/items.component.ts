import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/models/basket';
import { PublicDataService } from 'src/app/services/public-data.service';
import { OkdialogComponent } from '../../dialogs/okdialog/okdialog.component';

/**
 *class
 *
 * @export class
 * @class ItemsComponent
 * @implements {OnInit} on app inits
 */
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  /** handles paginator */

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** angular mat table */
  @ViewChild(MatTable) table!: MatTable<Basket>;
  /** data to show in the angular material table */
  dataSource: any;
  /** array to strore baskets list */
  basketItems: Basket[] = [];
  /** where to store products */
  public items: any[] = [];
  /** where we can save our list of shops */
  /** to save id of market */
  public basketId: string = '';

  displayedColumns = [
    'product_name',
    'quantity',
    'price',
    'total_price',
    'status',
    'action',
  ];

  /**
  constructor(
   *
   * @param publicService the is a service that handles our api request
   * @param route will handle navigation to other url
   *  @param router  will handle the extraction of element id string... from url
   * @param dialog to show dialogs
   */

  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  /** when the app loads */
  ngOnInit(): void {
    /** on init call this method */
    this.getBasket();
  }
  /** method to get data from service [Public-data]*/
  getBasket(): void {
    this.basketId = this.route.snapshot.paramMap.get('id') || '';
    const id = Number(this.basketId);
    this.publicService.getBasket(id).subscribe((data) => {
      this.basketItems = data.data;
      console.log(this.basketItems);
      //this.basketItems = data;
      this.basketItems = data.data;
      this.dataSource = new MatTableDataSource(this.basketItems);
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      console.log(this.basketItems);
    });
  }

  /**
   *  will navigate to products of the selected shop and will pass the id by url
   * @param id the id of product
   */

  onNavigate(id: number) {
    this.router.navigateByUrl(this.router.url + '/' + id);
  }
  /**
   * convert number to string
   * @param str str as number
   * @returns status as text
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
  /**
   * confirm all baskets
   */
  confirmAll() {
    let i = 0;

    this.basketItems.forEach((elem) => {
      elem.status = '1';
    });
    this.basketItems.forEach((elem) => {
      this.publicService
        .postItems(
          elem.id,
          Number(elem.quantity),
          elem.product_id,
          elem.unit_id,
          Number(elem.status)
        )
        .subscribe(
          (res) => {
            if (i === 0) {
              const content = 'Updated!';
              this.openOkDialog('SUCCESS!', content);
            }

            i = i + 1;
          },
          (error) => {
            if (i === 0) {
              const content = 'Error occured when trying to update item!';
              this.openOkDialog('ERROR!', content);
            }
            i = i + 1;
          }
        );
    });
  }
  /**
   * show dialog
   * @param title tile of dialog
   * @param content content of dilog
   */
  openOkDialog(title: string, content: string) {
    let dialogRef = this.dialog.open(OkdialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
  }
}
