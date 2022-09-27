import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { BRANDS, PRODUCTS, SHOPPINGLISTS, SUPERMARKETS, USERS } from '~/router/routes';

const Links = () => {
  const location = useLocation();
  return (
    <ul>
      <li>
        <Link to='/' className={location.pathname == '/' ? 'active' : ''}>
          Home
        </Link>
      </li>
      <li>
        <Link to={PRODUCTS} className={location.pathname.includes(PRODUCTS) ? 'active' : ''}>
          Products
        </Link>
      </li>
      <li>
        <Link to={BRANDS} className={location.pathname.includes(BRANDS) ? 'active' : ''}>
          Brands
        </Link>
      </li>
      <li>
        <Link
          to={SUPERMARKETS}
          className={location.pathname.includes(SUPERMARKETS) ? 'active' : ''}
        >
          SuperMarkets
        </Link>
      </li>
      <li>
        <Link
          to={SHOPPINGLISTS}
          className={location.pathname.includes(SHOPPINGLISTS) ? 'active' : ''}
        >
          Shopping Lists
        </Link>
      </li>
      <li>
        <Link to={USERS} className={location.pathname.includes(USERS) ? 'active' : ''}>
          Users
        </Link>
      </li>
    </ul>
  );
};

export default Links;
