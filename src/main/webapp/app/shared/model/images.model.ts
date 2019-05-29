import { INGUser } from 'app/shared/model/ng-user.model';
import { IPost } from 'app/shared/model/post.model';

export const enum ImageType {
  POST = 'POST',
  PRODUCT = 'PRODUCT',
  GARDEN = 'GARDEN'
}

export interface IImages {
  id?: string;
  imageURL?: string;
  imageType?: ImageType;
  nGUser?: INGUser;
  post?: IPost;
}

export const defaultValue: Readonly<IImages> = {};
