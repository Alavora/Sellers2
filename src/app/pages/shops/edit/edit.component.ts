import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { PublicDataService } from 'src/app/services/public-data.service';

/**
 * declare component
 */
/**
 *
 *
 * @export
 * @class EditComponent
 * @implements {OnInit} on app loads
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /** angular mat table */
  @ViewChild(MatTable) table!: MatTable<Product>;
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
  dataSource: any;

  public idShop!: string;
  public products: Product[] = [];
  displayedColumns = ['id', 'name', 'action'];
  /**
   * when app loads
   */
  ngOnInit(): void {
    this.idShop = this.route.snapshot.paramMap.get('id') || '';
    this.publicService.getproducts().subscribe((data) => {
      this.products = data.data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  /**
   *
   * @param id to navigate
   */
  onNavigate(id: number) {
    this.router.navigateByUrl(this.router.url + '/' + id);
  }
  /**
   *
   * @param id to delete item
   */
  onDelete(id: number) {}
}
