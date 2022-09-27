import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { BRANDS, PRODUCTS } from '~/router/routes';

function ProductsForm() {
  const [form, setForm] = useState({
    Name: '',
    BrandId: 0,
    SuperMarketId: 0,
    Price: 0,
  });
  const [superMarkets, setSuperMarkets] = useState([]);
  const [brands, setBrands] = useState([]);
  const params: any = useParams();
  const formType = !params.id ? 'create' : 'update';
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeSuperMarket = (e: any) => {
    setForm({ ...form, SuperMarketId: e.target.value });
    setBrands(brands.filter((item: any) => item.superMarketId == e.target.value));
  };
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    if (form.SuperMarketId === 0) {
      Swal.fire('Please select a supermarket');
      return;
    }
    if (form.BrandId === 0) {
      Swal.fire('Please select a brand');
      return;
    }
    if (formType === 'create') {
      API.post(ServerRoutes.CreateProduct, form).then(() =>
        Swal.fire('Product created!').then(() => navigate(PRODUCTS)),
      );
    } else {
      API.put(ServerRoutes.PutProduct(params.id), form).then(() =>
        Swal.fire('Product Updated!').then(() => navigate(PRODUCTS)),
      );
    }
  };
  useEffect(() => {
    if (formType === 'update') {
      API.get(ServerRoutes.GetProduct(params.id)).then((res: any) => {
        console.log(res.data);
        setForm({
          Name: res.data.name,
          Price: res.data.price,
          SuperMarketId: res.data.superMarketId,
          BrandId: res.data.brandId,
        });
      });
    } else {
      API.get(ServerRoutes.Brands).then((res: any) => {
        console.log(res.data);
        setBrands(res.data);
      });
      API.get(ServerRoutes.SuperMarket).then((res: any) => {
        setSuperMarkets(res.data);
        console.log(res.data);
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
        <>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>SuperMarket</Form.Label>
            <Form.Select
              onChange={handleChangeSuperMarket}
              name='SuperMarketId'
              value={form.SuperMarketId}
            >
              <option>Select Super Market</option>
              {superMarkets.map((superMarket: any) => (
                <option key={superMarket.id} value={superMarket.id}>
                  {superMarket.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Brand</Form.Label>
            <Form.Select
              disabled={form.SuperMarketId === 0}
              onChange={handleChange}
              name='BrandId'
              value={form.BrandId}
            >
              <option>Select Brand</option>
              {brands.map((brand: any) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </>
      )}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Price</Form.Label>
        <Form.Control type='number' onChange={handleChange} name='Price' value={form.Price} />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default ProductsForm;
