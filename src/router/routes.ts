export const FRONT_PAGE = '/';
export const HOME_PAGE = '/home';

export const PRODUCTS = '/products/';
export const PRODUCTS_CREATE = '/products/create';
export const PRODUCT_DELETE = (id: number | string) => `/products/${id}/delete`;
export const PRODUCT_UPDATE = (id: number | string) => `/products/${id}/update`;

export const BRANDS = '/brands';
export const BRANDS_CREATE = '/brands/create';
export const BRANDS_UPDATE = (id: number | string) => `/brands/${id}/delete`;
export const BRANDS_DELETE = (id: number | string) => `/brands/${id}/update`;

export const SUPERMARKETS = '/supermarkets';
export const SUPERMARKETS_CREATE = '/supermarkets/create';
export const SUPERMARKETS_DELETE = (id: number | string) => `/supermarkets/${id}/delete`;
export const SUPERMARKETS_UPDATE = (id: number | string) => `/supermarkets/${id}/update`;

export const USERS = '/users';
export const USERS_CREATE = '/users/create';
export const USERS_DELETE = (id: number | string) => `/users/${id}/delete`;
export const USERS_UPDATE = (id: number | string) => `/users/${id}/update`;

export const SHOPPINGLISTS = '/shoppinglists';
export const SHOPPINGLISTS_CREATE = '/shoppinglists/create';
export const SHOPPINGLISTS_DELETE = (id: number | string) => `/shoppinglists/${id}/delete`;
export const SHOPPINGLISTS_UPDATE = (id: number | string) => `/shoppinglists/${id}/update`;
