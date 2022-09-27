import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { SUPERMARKETS } from '~/router/routes';

function SuperMarketForm() {
  const [form, setForm] = useState({
    Name: '',
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
      API.post(ServerRoutes.CreateSuperMarket, form).then(() =>
        Swal.fire('Supermarket created!').then(() => navigate(SUPERMARKETS)),
      );
    } else {
      API.put(ServerRoutes.PutSuperMarket(params.id), form).then(() =>
        Swal.fire('Supermarket Updated!').then(() => navigate(SUPERMARKETS)),
      );
    }
  };
  useEffect(() => {
    if (formType === 'update') {
      API.get(ServerRoutes.GetSuperMarket(params.id)).then((res: any) => {
        console.log(res.data);
        setForm({
          Name: res.data.name,
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
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default SuperMarketForm;
