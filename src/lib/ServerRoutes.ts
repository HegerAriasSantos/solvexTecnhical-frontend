export const SERVER_ENDPOINT = 'https://localhost:44332/';
export const ServerRoutes = {
  Products: 'api/v1/product',
  CreateProduct: 'api/v1/product',
  GetProduct: (id: number) => `api/v1/product/${id}`,
  PutProduct: (id: number) => `api/v1/product/${id}`,
  DeleteProduct: (id: number) => `api/v1/product/${id}`,

  SuperMarket: 'api/v1/supermarket',
  CreateSuperMarket: 'api/v1/supermarket',
  GetSuperMarket: (id: number) => `api/v1/supermarket/${id}`,
  PutSuperMarket: (id: number) => `api/v1/supermarket/${id}`,
  DeleteSuperMarket: (id: number) => `api/v1/supermarket/${id}`,

  Brands: 'api/v1/brand',
  CreateBrand: 'api/v1/brand',
  GetBrand: (id: number) => `api/v1/brand/${id}`,
  PutBrand: (id: number) => `api/v1/brand/${id}`,
  DeleteBrand: (id: number) => `api/v1/brand/${id}`,

  ShoppingList: 'api/v1/shoppinglist',
  CreateShoppingList: 'api/v1/shoppinglist',
  GetShoppingListByUser: (id: number) => `api/v1/shoppinglist/user/${id}`,
  GetShoppingList: (id: number) => `api/v1/shoppinglist/${id}`,
  PutShoppingList: (id: number) => `api/v1/shoppinglist/${id}`,
  DeleteShoppingList: (id: number) => `api/v1/shoppinglist/${id}`,

  Users: 'api/v1/user',
  CreateUser: 'api/v1/user',
  GetUser: (id: number) => `api/v1/user/${id}`,
  PutUser: (id: number) => `api/v1/user/${id}`,
  DeleteUser: (id: number) => `api/v1/user/${id}`,
};
