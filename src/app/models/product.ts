import { Unit } from './unit';
/**
 *interface of Product
 *
 * @export declare
 * @interface Product name of interfce
 */
export interface Product {
  id: number;
  image_url: string;
  name: string;
  units: Unit[];
  shop_id: string;
}
