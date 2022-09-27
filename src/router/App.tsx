import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { lazy, Suspense, useEffect } from 'react';
import Loading from '~/views/Loading';
import {
  BRANDS,
  BRANDS_CREATE,
  BRANDS_UPDATE,
  PRODUCTS,
  PRODUCTS_CREATE,
  PRODUCT_UPDATE,
  SHOPPINGLISTS,
  SHOPPINGLISTS_CREATE,
  SHOPPINGLISTS_UPDATE,
  SUPERMARKETS,
  SUPERMARKETS_CREATE,
  SUPERMARKETS_UPDATE,
  USERS,
  USERS_CREATE,
  USERS_UPDATE,
} from './routes';

const Home = lazy(() => import('~/views/Home'));
const NotFound = lazy(() => import('~/views/NotFound'));
const Products = lazy(() => import('~/views/Products'));
const ProductsForm = lazy(() => import('~/views/ProductsForm'));
const Brands = lazy(() => import('~/views/Brands'));
const BrandsForm = lazy(() => import('~/views/BrandsForm'));
const Users = lazy(() => import('~/views/Users'));
const UsersForm = lazy(() => import('~/views/UsersForm'));
const ShoppingList = lazy(() => import('~/views/ShoppingList'));
const ShoppingListForm = lazy(() => import('~/views/ShoppingListForm'));
const SuperMarket = lazy(() => import('~/views/SuperMarket'));
const SuperMarketForm = lazy(() => import('~/views/SuperMarketForm'));

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* layout */}
          <Route path='/' element={<Layout />}>
            <Route element={<Home />} path='/' />

            <Route element={<Products />} path={PRODUCTS} />
            <Route element={<ProductsForm />} path={PRODUCTS_CREATE} />
            <Route element={<ProductsForm />} path={PRODUCT_UPDATE(':id')} />

            <Route element={<Brands />} path={BRANDS} />
            <Route element={<BrandsForm />} path={BRANDS_CREATE} />
            <Route element={<BrandsForm />} path={BRANDS_UPDATE(':id')} />

            <Route element={<Users />} path={USERS} />
            <Route element={<UsersForm />} path={USERS_CREATE} />
            <Route element={<UsersForm />} path={USERS_UPDATE(':id')} />

            <Route element={<ShoppingList />} path={SHOPPINGLISTS} />
            <Route element={<ShoppingListForm />} path={SHOPPINGLISTS_CREATE} />
            <Route element={<ShoppingListForm />} path={SHOPPINGLISTS_UPDATE(':id')} />

            <Route element={<SuperMarket />} path={SUPERMARKETS} />
            <Route element={<SuperMarketForm />} path={SUPERMARKETS_CREATE} />
            <Route element={<SuperMarketForm />} path={SUPERMARKETS_UPDATE(':id')} />

            <Route element={<NotFound />} path='*' />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
