import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReferralInterface {
  id?: string;
  referral_link: string;
  sign_ups: number;
  purchases: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ReferralGetQueryInterface extends GetQueryInterface {
  id?: string;
  referral_link?: string;
  user_id?: string;
}
