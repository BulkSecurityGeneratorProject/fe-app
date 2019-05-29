import { INGUser } from 'app/shared/model/ng-user.model';

export interface IDeviceDetails {
  id?: string;
  deviceId?: string;
  nGUser?: INGUser;
}

export const defaultValue: Readonly<IDeviceDetails> = {};
