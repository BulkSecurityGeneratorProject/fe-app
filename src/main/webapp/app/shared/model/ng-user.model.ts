import { ILocation } from 'app/shared/model/location.model';
import { IDeviceDetails } from 'app/shared/model/device-details.model';
import { IImages } from 'app/shared/model/images.model';
import { IPost } from 'app/shared/model/post.model';

export const enum VegetationType {
  ORGANIC = 'ORGANIC',
  NONORGANIC = 'NONORGANIC',
  BOTH = 'BOTH'
}

export const enum Status {
  INVITED = 'INVITED',
  CONFIRMED = 'CONFIRMED',
  DENIED = 'DENIED'
}

export interface INGUser {
  id?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  vegetationType?: VegetationType;
  gardenDescription?: string;
  email?: string;
  status?: Status;
  location?: ILocation;
  devices?: IDeviceDetails[];
  gardenImages?: IImages[];
  posts?: IPost[];
}

export const defaultValue: Readonly<INGUser> = {};
