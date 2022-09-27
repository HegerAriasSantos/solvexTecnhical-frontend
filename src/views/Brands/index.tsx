import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFilter from '~/hooks/useFilter';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import EntityWrapper from '~/components/EntityWrapper';
import { IBrand } from '~/Interfaces';
import { BRANDS_CREATE, BRANDS_UPDATE } from '~/router/routes';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

function Brands() {
  const MySwal = withReactContent(Swal);
  const [brands, setBrands] = useState<Array<IBrand>>([
    {
      id: 0,
      name: 'a',
      superMarketId: 0,
    },
  ]);
  const [brandsFilted, setBrandsFilted] = useState<Array<IBrand>>([
    {
      id: 0,
      name: 'a',
      superMarketId: 0,
    },
  ]);

  const handleDelete = (e: any) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
        const id = e.target.id;
        API.delete(ServerRoutes.DeleteBrand(id)).then(() => {
          const newBrands = brands.filter((item) => item.id != id);
          setBrands(newBrands);
          setBrandsFilted(newBrands);
        });
      }
    });
  };
  useEffect(() => {
    API.get(ServerRoutes.Brands).then((res: any) => {
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
      setBrands(orderedDatas);
      setBrandsFilted(orderedDatas);
    });
  }, []);
  return (
    <div className='admin'>
      <div className='admin__header'>
        <h1>Brands</h1>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link to={BRANDS_CREATE}>
          <Button variant='success'>Create brand</Button>
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
              onChange={(e) => setBrandsFilted(useFilter(brands, e.target.value))}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='admin__videos'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.entries(brands[0]).map(([key, value]) => {
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
            {brandsFilted.length > 0 ? (
              brandsFilted.map((superMarket, i) => (
                <EntityWrapper
                  key={i}
                  handleDelete={handleDelete}
                  Entity={superMarket}
                  EditRoute={BRANDS_UPDATE}
                />
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </Table>
        {brandsFilted.length === 0 && <h2>There's no brands match with your search</h2>}
      </div>
    </div>
  );
}

export default Brands;
