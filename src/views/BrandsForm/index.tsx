import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { BRANDS } from '~/router/routes';

function SuperMarketForm() {
  const [form, setForm] = useState({
    Name: '',
    SuperMarketId: 0,
  });
  const [superMarkets, setSuperMarkets] = useState([]);
  const params: any = useParams();
  const formType = !params.id ? 'create' : 'update';
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    if (form.SuperMarketId === 0) {
      Swal.fire('Please select a supermarket');
      return;
    }
    if (formType === 'create') {
      API.post(ServerRoutes.CreateBrand, form).then(() =>
        Swal.fire('Brand created!').then(() => navigate(BRANDS)),
      );
    } else {
      API.put(ServerRoutes.PutBrand(params.id), form).then(() =>
        Swal.fire('Brand Updated!').then(() => navigate(BRANDS)),
      );
    }
  };
  useEffect(() => {
    if (formType === 'update') {
      API.get(ServerRoutes.GetBrand(params.id)).then((res: any) => {
        console.log(res.data);
        setForm({
          Name: res.data.name,
          SuperMarketId: res.data.superMarketId,
        });
      });
    } else {
      API.get(ServerRoutes.SuperMarket).then((res: any) => {
        setSuperMarkets(res.data);
      });
    }
  }, []);

  return (
    <Form className='container'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' onChange={handleChange} name='Name' value={form.Name} />
      </Form.Group>
      {formType === 'create' && (
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>SuperMarketId</Form.Label>
          <Form.Select onChange={handleChange} name='SuperMarketId' value={form.SuperMarketId}>
            <option>Select SuperMarketId</option>
            {superMarkets.map((superMarket: any) => (
              <option key={superMarket.id} value={superMarket.id}>
                {superMarket.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default SuperMarketForm;
