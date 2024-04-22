import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// import './css/style.css';

// import './charts/ChartjsConfig';

// Import pages
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectAuth } from './slices/AuthSlice/index.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  GetMenu,
  SetToastData,
  selectAppConfig,
} from './slices/ConfigSlice/index.ts';

import Landing from './views/Landing.js';
import Dashboard from './views/Dashboard.js';
import Login from './views/auth/Login.js';
import Karyawan from './views/Karyawan.js';
import Role from './views/Role.js';
import RoleForm from './views/RoleForm.js';
import KaryawanForm from './views/KaryawanForm.js';
import Materi from './views/Materi.js';
import MateriForm from './views/MateriForm.js';
import Forum from './views/Forum.js';
import ForumForm from './views/ForumForm.js';
import ForumPage from './views/ForumPage.js';
import ForumPageDetail from './views/ForumPageDetail.js';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { loggedIn, userData } = useAppSelector(selectAuth);

  const { toastData, themeSelected, progress } =
    useAppSelector(selectAppConfig);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toastData) return;

    const { type, message } = toastData;

    switch (type) {
      case 'error':
        toast.error(message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;

      case 'success':
        toast.success(message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;

      default:
        toast(message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;
    }
    dispatch(SetToastData(null));
  }, [toastData, dispatch]);

  // useEffect(() => {
  //   if (loggedIn) dispatch(GetMenu());
  // }, [loggedIn, dispatch]);
  const previousLocation = location.state && location.state.background;

  return (
    <div className='flex h-screen overflow-hidden' data-theme={themeSelected}>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/auth' element={<Login />} />
        {loggedIn && (
          <>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/data/karyawan' element={<Karyawan />} />
            <Route
              exact
              path='/data/karyawan/:path'
              element={<KaryawanForm />}
            />
            <Route exact path='/data/role' element={<Role />} />
            <Route exact path='/data/role/:path' element={<RoleForm />} />
            <Route exact path='/data/materi' element={<Materi />} />
            <Route exact path='/data/materi/:path' element={<MateriForm />} />
            <Route exact path='/data/forum' element={<Forum />} />
            <Route exact path='/data/forum/:path' element={<ForumForm />} />
            <Route exact path='/forum' element={<ForumPage />} />
            <Route exact path='/materi' element={<ForumPage />} />
            <Route exact path='/forum/:path' element={<ForumPageDetail />} />
            <Route path='*' element={<Navigate replace to={'/dashboard'} />} />
          </>
        )}
        <Route path='*' element={<Navigate replace to={'/'} />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

// ----------------------------------------------------------------------------------- //

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
