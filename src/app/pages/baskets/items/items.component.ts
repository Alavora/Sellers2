import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/models/basket';
import { PublicDataService } from 'src/app/services/public-data.service';

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
   */

  constructor(
    private publicService: PublicDataService,
    private route: ActivatedRoute,
    private router: Router
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
  confirmAll() {
    this.basketItems.forEach((elem) => {
      elem.status = '1';
    });
  }
}
