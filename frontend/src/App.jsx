// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

const App = () => {
  // useEffect(() => {
  //   // http://localhost:8080
  //   // , { mode: 'cors' }
  //   fetch('/api/test')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
      <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
