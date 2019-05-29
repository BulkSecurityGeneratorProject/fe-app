import { Moment } from 'moment';
import { INGUser } from 'app/shared/model/ng-user.model';
import { IImages } from 'app/shared/model/images.model';

export interface IPost {
  id?: string;
  title?: string;
  price?: number;
  msrp?: number;
  weight?: number;
  availableQty?: number;
  remainingQty?: number;
  description?: string;
  moreInfo?: string;
  startTime?: Moment;
  endTime?: Moment;
  nGUser?: INGUser;
  images?: IImages[];
}

export const defaultValue: Readonly<IPost> = {};
