import { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFilter from '~/hooks/useFilter';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { IShoppingList } from '~/Interfaces';
import { SHOPPINGLISTS_CREATE, SHOPPINGLISTS_UPDATE } from '~/router/routes';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

function ShoppingList() {
  const MySwal = withReactContent(Swal);
  const [ShoppingList, setShoppingList] = useState<Array<IShoppingList>>([
    {
      id: 0,
      name: '',
      superMarketId: 0,
      superMarketName: '',
      userId: 0,
      products: [],
      totalPrice: 0,
      countProducts: 0,
      createdDate: new Date(),
      user: {
        id: 0,
        name: '',
        lastName: '',
        cedula: '',
      },
    },
  ]);
  const [ShoppingListFilted, setShoppingListFilted] = useState<Array<IShoppingList>>([
    {
      id: 0,
      name: '',
      superMarketId: 0,
      superMarketName: '',
      userId: 0,
      products: [],
      totalPrice: 0,
      countProducts: 0,
      createdDate: new Date(),
      user: {
        id: 0,
        name: '',
        lastName: '',
        cedula: '',
      },
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
        API.delete(ServerRoutes.DeleteShoppingList(id)).then(() => {
          const newShoppingList = ShoppingList.filter((item) => item.id != id);
          setShoppingList(newShoppingList);
          setShoppingListFilted(newShoppingList);
        });
      }
    });
  };
  useEffect(() => {
    API.get(ServerRoutes.ShoppingList).then((res: any) => {
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
      setShoppingList(orderedDatas);
      setShoppingListFilted(orderedDatas);
    });
  }, []);
  return (
    <div className='admin'>
      <div className='admin__header'>
        <h1>ShoppingList</h1>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link to={SHOPPINGLISTS_CREATE}>
          <Button variant='success'>Create Shopping List</Button>
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
              onChange={(e) => setShoppingListFilted(useFilter(ShoppingList, e.target.value))}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='admin__videos'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Super Market</th>
              <th>User Name</th>
              <th>TotalPrice</th>
              <th>CountProducts</th>
              <th>CreatedDate</th>

              <th style={{ fontSize: '18px', textTransform: 'capitalize' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ShoppingListFilted.length > 0 ? (
              ShoppingListFilted.map((ShoppingList, i) => (
                <tr key={i}>
                  <td>{ShoppingList.id}</td>
                  <td>{ShoppingList.superMarketName}</td>
                  <td>{`${ShoppingList.user?.name}  ${ShoppingList.user?.lastName}`}</td>
                  <td>{ShoppingList.totalPrice}</td>
                  <td>{ShoppingList.products?.length}</td>
                  <td>{ShoppingList.createdDate?.toString() as ReactNode}</td>

                  <td>
                    <Button variant='danger' onClick={handleDelete}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </Table>
        {ShoppingListFilted.length === 0 && <h2>There's no ShoppingList match with your search</h2>}
      </div>
    </div>
  );
}

export default ShoppingList;
