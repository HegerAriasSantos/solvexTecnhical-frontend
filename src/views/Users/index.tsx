import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useFilter from '~/hooks/useFilter';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import EntityWrapper from '~/components/EntityWrapper';
import { IBrand } from '~/Interfaces';
import { USERS_CREATE, USERS_UPDATE } from '~/router/routes';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

function Users() {
  const MySwal = withReactContent(Swal);
  const [Users, setUsers] = useState<Array<IBrand>>([
    {
      id: 0,
      name: 'a',
      superMarketId: 0,
    },
  ]);
  const [UsersFilted, setUsersFilted] = useState<Array<IBrand>>([
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
        API.delete(ServerRoutes.DeleteUser(id)).then(() => {
          const newUsers = Users.filter((item) => item.id != id);
          setUsers(newUsers);
          setUsersFilted(newUsers);
        });
      }
    });
  };
  useEffect(() => {
    API.get(ServerRoutes.Users).then((res: any) => {
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
      setUsers(orderedDatas);
      setUsersFilted(orderedDatas);
    });
  }, []);
  return (
    <div className='admin'>
      <div className='admin__header'>
        <h1>Users</h1>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Link to={USERS_CREATE}>
          <Button variant='success'>Create user</Button>
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
              onChange={(e) => setUsersFilted(useFilter(Users, e.target.value))}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='admin__videos'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {Object.entries(Users[0]).map(([key, value]) => {
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
            {UsersFilted.length > 0 ? (
              UsersFilted.map((User, i) => (
                <EntityWrapper
                  key={i}
                  handleDelete={handleDelete}
                  Entity={User}
                  EditRoute={USERS_UPDATE}
                />
              ))
            ) : (
              <span></span>
            )}
          </tbody>
        </Table>
        {UsersFilted.length === 0 && <h2>There's no Users match with your search</h2>}
      </div>
    </div>
  );
}

export default Users;
