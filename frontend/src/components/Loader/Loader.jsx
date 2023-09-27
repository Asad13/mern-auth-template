import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        zIndex: 11,
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '70px',
          height: '70px',
          margin: 'auto',
          display: 'block',
          color: 'red',
        }}
      />
    </div>
  );
};

export default Loader;
