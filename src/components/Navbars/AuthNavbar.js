/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
// components

import PagesDropdown from '../../components/Dropdowns/PagesDropdown';
import { selectAuth } from '../../slices/AuthSlice/index.ts';
import { useAppSelector } from '../../app/hooks.ts';
import UserDropdown from '../../components/Dropdowns/UserDropdown.js';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { loggedIn, userData } = useAppSelector(selectAuth);
  return (
    <>
      <nav className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-slate-700 bg-opacity-90'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
              to='/'
            >
              Best Energy System
            </Link>
            <button
              className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='text-white fas fa-bars'></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id='example-navbar-warning'
          >
            {/* <ul className='flex flex-col lg:flex-row list-none mr-auto'>
              <li className='flex items-center'>
                <a
                  className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  href='https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-auth-navbar'
                >
                  <i className='lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2' />{' '}
                  Docs
                </a>
              </li>
            </ul> */}
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              {!loggedIn ? (
                <li className='flex items-center'>
                  <Link to='/auth'>
                    <button
                      className='bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'
                      type='button'
                    >
                      <i className='fas fa-arrow-alt-circle-right'></i> Login
                    </button>
                  </Link>
                </li>
              ) : (
                <>
                  <li className='flex items-center'>
                    <Link
                      className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                      to={'/dashboard'}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className='flex items-center'>
                    <PagesDropdown />
                  </li>
                  <li className='flex items-center'>
                    <Link
                      className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                      to={'/materi'}
                    >
                      Materi
                    </Link>
                  </li>
                  <li className='flex items-center'>
                    <Link
                      className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                      to={'/forum'}
                    >
                      Forum
                    </Link>
                  </li>
                  <ul className='flex-col md:flex-row list-none items-center hidden md:flex ml-10'>
                    <UserDropdown />
                  </ul>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
