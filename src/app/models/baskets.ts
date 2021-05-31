import { Unit } from './unit';
import { Basket } from './basket';
export interface Baskets{
  id:number;
  shop_id:number;
  size:number;
  status:string;
  distributor_id : string;
  unit: string;
  items: Basket[];
  units: Unit[];
}
