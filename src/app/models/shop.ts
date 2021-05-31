import { Market } from '../models/market';
/**
 * interface of the shop
 */
export interface Shop {
  /** id of shop */
  id: number;
  /** name of shop */
  name: string;
  /** cif of shop */
  cif: string;
  /** address of shop */
  adress: string;
  /** latitude of shop */
  latitude: number;
  /** longitude of shop */
  longitude: number;
  /** image of shop */
  image: string;
  /** phone number of shop */
  phone: string;
  /** marlets that belong it  */
  market: Market[];
}
