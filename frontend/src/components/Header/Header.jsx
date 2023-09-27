import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../state/api/users/usersApiSlice';
import { clearCredentials } from '../../state/features/auth/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  NavDropdown,
} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.log(error?.message ?? error?.error);
    }
  };

  return (
    <header>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <NavbarBrand>MERN APP</NavbarBrand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="top-navbar" />
          <Navbar.Collapse id="top-navbar">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <NavDropdown title={user?.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout <FaSignOutAlt />
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <LinkContainer to="/login">
                      <NavLink>
                        <FaSignInAlt /> Sign In
                      </NavLink>
                    </LinkContainer>
                  </NavItem>
                  <NavItem>
                    <LinkContainer to="/register">
                      <NavLink>Register</NavLink>
                    </LinkContainer>
                  </NavItem>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
