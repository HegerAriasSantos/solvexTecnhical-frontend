export interface ISuperMarket {
  id: number;
  name: string;
  brands?: Array<IBrand>;
  products?: Array<IProducts>;
}

export interface IProducts {
  id: number;
  name: string;
  brand?: IBrand;
  brandId: number;
  price: number;
  superMarketId: number;
}

export interface IBrand {
  id: number;
  name: string;
  superMarketId: number;
  superMarket?: ISuperMarket;
}

export interface IShoppingList {
  id?: number;
  name: string;
  superMarketName: string;
  superMarketId: number;
  userId: number;
  user?: IUser;
  productsIds?: Array<number>;
  products?: Array<IProducts>;
  createdDate?: Date;
  totalPrice: number;
  countProducts: number;
}

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  cedula: string;
  shoppingLists?: Array<IShoppingList>;
}
