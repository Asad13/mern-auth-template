import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../state/features/auth/authSlice';
import { useLoginMutation } from '../../state/api/users/usersApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      toast.dismiss();
      navigate('/');
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (email && password) {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials(res));
      } else {
        throw new Error('Fill up all the fields');
      }
    } catch (err) {
      if (err?.data) {
        toast.error(err?.data?.message);
      } else {
        toast.error(err?.message ?? err.error);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Login;
