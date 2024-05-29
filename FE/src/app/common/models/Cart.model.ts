import {User} from "./User.model";
import {Product} from "./Product.model";

export interface Cart{
  id ?: String;
  user: User;
  products: Array<Product>;
  finalPrice: number;
  time: string;
}
