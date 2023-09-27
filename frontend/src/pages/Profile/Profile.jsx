import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../state/features/auth/authSlice';
import { useUpdateUserMutation } from '../../state/api/users/usersApiSlice';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader/Loader';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.email, user.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (name && email) {
        let body = { name, email };

        if (password) {
          if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
          } else if (password !== confirmPassword) {
            throw new Error('Password mismatch');
          } else {
            body.password = password;
          }
        }

        const res = await updateProfile(body).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
      } else {
        throw new Error('Fill up name and email');
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
        <h1>Update Profile</h1>

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
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Profile;
