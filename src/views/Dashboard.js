import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

// components

// import Navbar from './components/Navbars/AuthNavbar.js';
import Navbar from '../components/Navbars/AuthNavbar.js';
// import Footer from './components/Footers/Footer.js';
import Footer from '../components/Footers/Footer.js';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { GetForum, selectForum } from '../slices/ForumSlice/index.ts';
import { GetMateri, selectMateri } from '../slices/MateriSlice/index.ts';
import moment from 'moment';

export default function Dashboard() {
  const [calendar, setCalendar] = useState(new Date());
  const dispatch = useAppDispatch();
  const { data: dataForum } = useAppSelector(selectForum);
  const { data: dataMateri } = useAppSelector(selectMateri);
  useEffect(() => {
    dispatch(GetForum());
    dispatch(GetMateri());
  }, [dispatch]);
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'>
          <div className='w-full text-center bg-lightBlue-600 pt-16'>
            <div className='pr-12 py-20'>
              <h1 className='text-white font-semibold text-xl'>
                Selamat Datang
              </h1>
              {/* <h1 className='text-white font-semibold text-2xl'>
                Husam Izzudin Hibatullah
              </h1> */}
              <h2 className='text-white text-2xl py-2 font-bold'>
                KMS PT. Best Energy System
              </h2>
            </div>
          </div>
        </div>

        <section className='py-6 bg-blueGray-200 px-6 md:px-0'>
          <div className='container mx-auto'>
            <h3 className='font-semibold text-lg text-blueGray-500'>
              Dashboard
            </h3>
          </div>
        </section>

        {/* <section className='relative py-20'>
          <div
            className='bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20'
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon
                className='text-white fill-current'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>

          <div className='container mx-auto px-4'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full md:w-4/12 ml-auto mr-auto px-4'>
                <img
                  alt='...'
                  className='max-w-full rounded-lg shadow-lg'
                  src='https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
                />
              </div>
              <div className='w-full md:w-5/12 ml-auto mr-auto px-4'>
                <div className='md:pr-12'>
                  <div className='text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300'>
                    <i className='fas fa-rocket text-xl'></i>
                  </div>
                  <h3 className='text-3xl font-semibold'>A growing company</h3>
                  <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                    The extension comes with three pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className='list-none mt-6'>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3'>
                            <i className='fas fa-fingerprint'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-blueGray-500'>
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3'>
                            <i className='fab fa-html5'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-blueGray-500'>
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className='py-2'>
                      <div className='flex items-center'>
                        <div>
                          <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3'>
                            <i className='far fa-paper-plane'></i>
                          </span>
                        </div>
                        <div>
                          <h4 className='text-blueGray-500'>
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap mt-12 justify-center'>
              <div className='w-full lg:w-9/12 pr-0 md:pr-4'>
                <div className='mb-10'>
                  <h2 className='text-2xl font-semibold text-blueGray-700'>
                    Materi Terbaru
                  </h2>
                  <ul className=''>
                    {dataMateri?.rows?.map(
                      ({ user, title, createdAt, id, product }, index) => (
                        <li
                          className='py-2 border-b border-dotted border-slate-300'
                          key={index}
                        >
                          <Link to={`/materi/${id}`}>
                            <h3 className='font-semibold text-slate-600'>
                              {title}
                            </h3>
                          </Link>
                          {product && (
                            <Link to={`/data/produk/${product.id}`}>
                              <h3 className='font-semibold text-lg text-slate-600 hover:underline'>
                                Produk : {product.name}
                              </h3>
                            </Link>
                          )}
                          <p className='text-sm text-slate-500'>
                            {moment(createdAt).format('DD/MM/YY')} | Materi by{' '}
                            <span className='font-semibold'>{user.name}</span>
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className='mb-10'>
                  <h2 className='text-2xl font-semibold text-blueGray-700'>
                    Forum Terbaru
                  </h2>
                  <ul className=''>
                    {dataForum?.rows?.map(({ id, title, user, createdAt }) => (
                      <li className='py-2 border-b border-dotted border-slate-300'>
                        <Link to={`/forum/${id}`}>
                          <h3 className='font-semibold text-slate-600'>
                            {title}
                          </h3>
                        </Link>
                        <p className='text-sm text-slate-500'>
                          {moment(createdAt).format('DD/MM/YY')} | Forum by{' '}
                          <span className='font-semibold'>{user.name}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='w-full lg:w-3/12 pl-0 md:pl-4 text-center h-[100px]'>
                <div className='w-full h-full border'>
                  <Calendar onChange={setCalendar} value={calendar} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
