import './styles.scss';
import { Link } from 'react-router-dom';
import Links from './Links';

const Navbar = () => {
  return (
    <nav>
      <input type='checkbox' id='check'></input>
      <label className='checkbtn'>
        <i className='fas fa-bars'></i>
      </label>

      <Link
        style={{
          textDecoration: 'none',
          paddingLeft: '0',
        }}
        to='/'
        className='enlace'
      >
        <h3
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          Test Technical
        </h3>
      </Link>

      <Links />
    </nav>
  );
};

export default Navbar;
