import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { API } from '~/API';
import { ServerRoutes } from '~/lib/ServerRoutes';
import { SHOPPINGLISTS } from '~/router/routes';

function ShoppingListForm() {
  const [form, setForm] = useState<any>({
    UserId: 0,
    SuperMarketId: 0,
    ProductsIds: [],
  });
  const [superMarkets, setSuperMarkets] = useState([]);
  const [Products, setProducts] = useState([]);
  const [Users, setUsers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeSuperMarket = (e: any) => {
    setForm({ ...form, SuperMarketId: e.target.value });
    setProducts(Products.filter((item: any) => item.superMarketId == e.target.value));
  };
  const handleAddProduct = (e: any) => {
    setForm({ ...form, ProductsIds: [...form.ProductsIds, Number(e.target.value)] });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    if (form.SuperMarketId === 0) {
      Swal.fire('Please select a supermarket');
      return;
    }
    if (form.UserId === 0) {
      Swal.fire('Please select a brand');
      return;
    }
    if (form.ProductsIds.length === 0) {
      Swal.fire('Please select at least one product');
      return;
    }
    API.post(ServerRoutes.CreateShoppingList, form).then(() =>
      Swal.fire('Shopping List created!').then(() => navigate(SHOPPINGLISTS)),
    );
  };
  useEffect(() => {
    API.get(ServerRoutes.Products).then((res: any) => {
      setProducts(res.data);
    });
    API.get(ServerRoutes.SuperMarket).then((res: any) => {
      setSuperMarkets(res.data);
    });
    API.get(ServerRoutes.Users).then((res: any) => {
      setUsers(res.data);
    });
  }, []);
  useEffect(() => {
    form.ProductsIds.forEach((e: any) =>
      setSelectedProducts([...selectedProducts, Products.find((item: any) => item.id == e)]),
    );
  }, [form.ProductsIds]);

  return (
    <Form className='container'>
      <Form.Group className='mb-3'>
        <Form.Label>SuperMarket</Form.Label>
        <Form.Select
          onChange={handleChangeSuperMarket}
          name='SuperMarketId'
          value={form.SuperMarketId}
        >
          <option>Select Super Market</option>
          {superMarkets.map((superMarket: any, index) => (
            <option key={index} value={superMarket.id}>
              {superMarket.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>User</Form.Label>
        <Form.Select onChange={handleChange} name='UserId' value={form.UserId}>
          <option>Select User</option>
          {Users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Products</Form.Label>
        <Form.Select
          disabled={form.SuperMarketId === 0}
          onChange={handleAddProduct}
          name='ProuctsIds'
        >
          <option>Select Product</option>
          {Products.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {selectedProducts.map((product: any, index: number) => {
        return (
          <Form.Group key={index} className='mb-3'>
            <Form.Label>{product.name}</Form.Label>
          </Form.Group>
        );
      })}
      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default ShoppingListForm;
