import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PricingInterface {
  id?: string;
  package_name: string;
  price: number;
  features: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PricingGetQueryInterface extends GetQueryInterface {
  id?: string;
  package_name?: string;
  features?: string;
  user_id?: string;
}
