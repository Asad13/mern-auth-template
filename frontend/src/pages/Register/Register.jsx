import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../../state/api/users/usersApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader/Loader';

const Register = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (name && email && password && confirmPassword) {
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        } else if (password !== confirmPassword) {
          throw new Error('Password mismatch');
        } else {
          const res = await register({ name, email, password }).unwrap();
          toast.success(res?.message ?? 'Registered successfully');
          navigate('/login');
        }
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
        <h1>Register</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to={`/login`}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Register;
