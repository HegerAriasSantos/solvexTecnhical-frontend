import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { USERS } from '~/router/routes';

function UsersForm() {
  const [form, setForm] = useState({
    Name: '',
    LastName: '',
    Cedula: '',
  });
  const params: any = useParams();
  const formType = !params.id ? 'create' : 'update';
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    if (formType === 'create') {
      API.post(ServerRoutes.CreateUser, form).then(() =>
        Swal.fire('User created!').then(() => navigate(USERS)),
      );
    } else {
      API.put(ServerRoutes.PutUser(params.id), form).then(() =>
        Swal.fire('User Updated!').then(() => navigate(USERS)),
      );
    }
  };
  useEffect(() => {
    if (formType === 'update') {
      API.get(ServerRoutes.GetUser(params.id)).then((res: any) => {
        console.log(res.data);
        setForm({
          Name: res.data.name,
          LastName: res.data.lastName,
          Cedula: res.data.cedula,
        });
      });
    }
  }, []);

  return (
    <Form className='container'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' onChange={handleChange} name='Name' value={form.Name} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>LastName</Form.Label>
        <Form.Control type='text' onChange={handleChange} name='LastName' value={form.LastName} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Cedula</Form.Label>
        <Form.Control type='text' onChange={handleChange} name='Cedula' value={form.Cedula} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default UsersForm;
