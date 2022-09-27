import './styles.scss';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '~/router/routes';
import { Button } from 'react-bootstrap';

function App() {
  return (
    <div
      className='container'
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Welcome to my solution test</h2>
      <Link to={PRODUCTS}>
        <Button>Go to Products</Button>
      </Link>
    </div>
  );
}

export default App;
