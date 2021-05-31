import { Baskets } from './../../models/baskets';
import { PublicDataService } from '../../services/public-data.service';
import { Product } from '../../models/product';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { commentDialog } from 'src/app/pages/dialogs/comment-dialog/comment-dialog.component';
import { OkdialogComponent } from '../dialogs/okdialog/okdialog.component';
import { Basket } from 'src/app/models/basket';

/** interface of Unit */
interface Unit {
  id: number;
  view: string;
  viewValue: string;
}
/** interface of comment dialog */
export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent implements OnInit {
  /** handles paginator */

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** angular mat table */
  @ViewChild(MatTable) table!: MatTable<Baskets>;
  /** data to show in the angular material table */
  dataSource: any;
  /** array to strore baskets list */
  basketItems: Basket[] = [];
  /** where to store products */
  public items: any[] = [];
  /** where we can save our list of shops */
  public baskets: Baskets[] = [];
  /** to save id of market */
  public idMarket: string = '';

  displayedColumns = ['id', 'quantity', 'comments', 'status', 'details'];

  /**
  constructor(
   *
   * @param publicService the is a service that handles our api request
   * @param route will handle navigation to other url
   *  @param router  will handle the extraction of element id string... from url
   */

  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  /** when the app loads */
  ngOnInit(): void {
    /** on init call this method */
    this.getBaskets();
  }
  /** method to get data from service [Public-data]*/
  getBaskets(): void {
    this.idMarket = this.route.snapshot.paramMap.get('id') || '';
    const id = Number(this.idMarket);
    this.publicService.getBaskets().subscribe((data) => {
      this.baskets = data;
      //this.basketItems = data;
      this.baskets = data.data;
      this.dataSource = new MatTableDataSource(this.baskets);
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      console.log(this.baskets);
    });
  }

  /**
   *  will navigate to products of the selected shop and will pass the id by url
   * @param id the id of product
   */

  onNavigate(id: number) {
    this.router.navigateByUrl(this.router.url + '/' + id + '/items');
  }

  deleteShop(shop: any) {
    console.log('ddddd');
  }

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
