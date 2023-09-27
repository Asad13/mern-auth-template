import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div style={{ padding: '2rem 0', textAlign: 'center' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        <Link to="/">Go To Home</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
