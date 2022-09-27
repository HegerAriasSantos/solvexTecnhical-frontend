import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFilter from '~/hooks/useFilter';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import EntityWrapper from '~/components/EntityWrapper';
import { IProducts } from '~/Interfaces';
import { PRODUCTS_CREATE, PRODUCT_UPDATE } from '~/router/routes';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

function Products() {
  const MySwal = withReactContent(Swal);
  const [Products, setProducts] = useState<Array<IProducts>>([
    {
      id: 0,
      name: 'a',
      price: 0,
      brandId: 0,
      superMarketId: 0,
    },
  ]);
  const [ProductsFilted, setProductsFilted] = useState<Array<IProducts>>([
    {
      id: 0,
      name: 'a',
      price: 0,
      brandId: 0,
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
        API.delete(ServerRoutes.DeleteProduct(id)).then(() => {
          const newProducts = Products.filter((item) => item.id != id);
          setProducts(newProducts);
          setProductsFilted(newProducts);
        });
      }
    });
  };
  useEffect(() => {
    API.get(ServerRoutes.Products).then((res: any) => {
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
      setProducts(orderedDatas);
      setProductsFilted(orderedDatas);
    });
  }, []);
  return (
    <div className='admin'>
      <div className='admin__header'>
        <h1>Products</h1>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link to={PRODUCTS_CREATE}>
          <Button variant='success'>Create product</Button>
        </Link>
        <Form
          style={{
            margin: 'auto',
            flex: 0.3,
          }}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Sarch</Form.Label>
            <Form.Control
              type='text'
              id='search'
              placeholder='Buscar...'
              onChange={(e) => setProductsFilted(useFilter(Products, e.target.value))}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='admin__videos'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.entries(Products[0]).map(([key, value]) => {
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
            {ProductsFilted.length > 0 ? (
              ProductsFilted.map((superMarket, i) => (
                <EntityWrapper
                  key={i}
                  handleDelete={handleDelete}
                  Entity={superMarket}
                  EditRoute={PRODUCT_UPDATE}
                />
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </Table>
        {ProductsFilted.length === 0 && <h2>There's no Products match with your search</h2>}
      </div>
    </div>
  );
}

export default Products;
