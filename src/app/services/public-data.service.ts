import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop';
@Injectable({
  providedIn: 'root',
})
export class PublicDataService {
  private url = environment.API_URL;
  constructor(private http: HttpClient) {}

  /*     public getMarkets() :Observable<Market[]> {
    const url = this.url  + 'markets';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }
 */

  public getShopsByID(id: number): Observable<Shop[]> {
    const url = this.url + 'shops';
    return this.http
      .get(url, { params: { market_id: id } })
      .pipe(map((result: any) => result.data));
  }

  public getShops(): Observable<Shop[]> {
    const url = this.url + 'seller/shops';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  public getProductByShopID(id: number) {
    const id_shop = Number(id);
    const url = this.url + 'products';
    return this.http
      .get(url, { params: { shop_id: id_shop } })
      .pipe(map((result: any) => result.data));
  }

  getBaskets() {
    const url = this.url + 'seller/baskets';
    return this.http.get(url).pipe(map((result: any) => result));
  }
  /**
   * return specified basket
   * @param id id del basket
   * @returns reponse of http request
   */
  getBasket(id: number) {
    const url = this.url + 'seller/baskets/' + id + '/items';
    return this.http.get(url).pipe(map((result: any) => result));
  }

  getUnits() {
    const url = this.url + 'units';
    return this.http.get(url).pipe(map((result: any) => result.data));
  }

  postItems(
    item_id: number,
    quantity: number,
    product_id: number,
    unit_id: number,
    status: number
  ) {
    const url = this.url + 'seller/baskets/items/update';
    return this.http
      .post<any>(url, {
        item_id,
        quantity,
        product_id,
        unit_id,
        status,
      })
      .pipe();
  }

  getproducts() {
    const url = this.url + 'seller/products';
    return this.http.get(url).pipe(map((result: any) => result));
  }

  postproducts(
    id: number,
    name: string,
    image_url: string,
    shop_id: number,
    units: any[]
  ) {
    const url = this.url + 'seller/products/' + id;
    return this.http
      .post<any>(url, { name, image_url, shop_id, units })
      .pipe(map((result: any) => result));
  }

  putproducts(
    id: number,
    name: string,
    image_url: string,
    shop_id: number,
    units: any[]
  ) {
    const url = this.url + 'seller/products/' + id;
    return this.http
      .put<any>(url, { name, image_url, shop_id, units })
      .pipe(map((result: any) => result));
  }
}
