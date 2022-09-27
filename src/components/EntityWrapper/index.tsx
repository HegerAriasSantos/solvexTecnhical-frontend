import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function index(props: any) {
  const { Entity, handleDelete, EditRoute } = props;

  return (
    <tr>
      {Object.entries(Entity).map(([key, value]) => {
        if (!key || !value) return null;
        if (typeof value === 'object') return null;
        if (key.includes('Id')) return null;
        if (key === 'isDeleted') return null;

        return <td key={key}>{value as ReactNode}</td>;
      })}
      <td>
        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Button variant='danger' id={Entity.id} onClick={handleDelete}>
            Borrar
          </Button>
          <Link to={EditRoute(Entity.id)}>
            <Button variant='secondary' className='edit'>
              Editar
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default index;
