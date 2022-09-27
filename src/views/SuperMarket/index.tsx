import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFilter from '~/hooks/useFilter';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import EntityWrapper from '~/components/EntityWrapper';
import { ISuperMarket } from '~/Interfaces';
import { SUPERMARKETS_CREATE, SUPERMARKETS_UPDATE } from '~/router/routes';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

function Supermarket() {
  const MySwal = withReactContent(Swal);
  const [superMarket, setSuperMarket] = useState<Array<ISuperMarket>>([
    {
      id: 0,
      name: 'a',
      brands: [],
      products: [],
    },
  ]);
  const [superMarketFilted, setSuperMarketFilted] = useState<Array<ISuperMarket>>([
    {
      id: 0,
      name: '',
      brands: [],
      products: [],
    },
  ]);

  const handleDelete = (e: any) => {
    MySwal.fire({
      title: 'Seguro que quieres borrar este cliente?',
      text: 'No podras recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
        const id = e.target.id;
        API.delete(ServerRoutes.DeleteSuperMarket(id)).then(() => {
          const newSuperMarket = superMarket.filter((item) => item.id != id);
          setSuperMarket(newSuperMarket);
          setSuperMarketFilted(newSuperMarket);
        });
      }
    });
  };
  useEffect(() => {
    API.get(`${ServerRoutes.SuperMarket}`).then((res: any) => {
      const orderedDatas = res.data.sort(function (a: any, b: any) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });
      console.log(orderedDatas);
      setSuperMarket(orderedDatas);
      setSuperMarketFilted(orderedDatas);
    });
  }, []);
  return (
    <div className='admin'>
      <div className='admin__header'>
        <h1>Super Markets</h1>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link to={SUPERMARKETS_CREATE}>
          <Button variant='success'>Create Super Market</Button>
        </Link>
        <Form
          style={{
            margin: 'auto',
            flex: 0.3,
          }}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Busqueda</Form.Label>
            <Form.Control
              type='text'
              id='search'
              placeholder='Buscar...'
              onChange={(e) => setSuperMarketFilted(useFilter(superMarket, e.target.value))}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='admin__videos'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.entries(superMarket[0]).map(([key, value]) => {
                if (typeof value === 'object') return null;
                if (key === 'isDeleted') return null;
                if (key.includes('Id')) return null;
                return (
                  <th style={{ fontSize: '18px', textTransform: 'capitalize' }} key={key}>
                    {key}
                  </th>
                );
              })}
              <th style={{ fontSize: '18px', textTransform: 'capitalize' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {superMarketFilted.length > 0 ? (
              superMarketFilted.map((superMarket, i) => (
                <EntityWrapper
                  key={i}
                  handleDelete={handleDelete}
                  Entity={superMarket}
                  EditRoute={SUPERMARKETS_UPDATE}
                />
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </Table>
        {superMarketFilted.length === 0 && <h2>There's no supermarket match with your search</h2>}
      </div>
    </div>
  );
}

export default Supermarket;
