import { Unit } from './unit';
/**
 *interface of unit
 *
 * @export
 * @interface Item
 */
export interface Item {
  basket_id: number;
  id: number;
  price: string;
  product_id: number;
  unit_id: number;
  product_name: number;
  status: string;
  total_price: string;
  unit_symbol: string;
  units: Unit[];
}
