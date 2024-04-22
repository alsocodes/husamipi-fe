import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import * as moment from 'moment';
// components

import Navbar from '../components/Navbars/AuthNavbar.js';
import MyTable from '../components/MyTable/index.tsx';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  DeleteForum,
  GetForum,
  SetDetail,
  selectForum,
} from '../slices/ForumSlice/index.ts';
import { selectAuth } from '../slices/AuthSlice/index.ts';
import { Link, useNavigate } from 'react-router-dom';

export default function ForumPage() {
  const [params, setParams] = useState({
    search: '',
    page: 1,
    orderBy: 'id',
    order: 'desc',
    size: 10,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, progress, formResult } = useAppSelector(selectForum);
  const accesses = useAppSelector(selectAuth).userData?.role?.accesses;

  useEffect(() => {
    dispatch(GetForum(params));
  }, [dispatch, params, formResult]);

  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb title={'Forum'} />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto'>
            <h3 className='text-3xl mb-2 font-semibold leading-normal text-slate-700'>
              Forum Diskusi
            </h3>
            <ul className='flex flex-col gap-4'>
              {data?.rows.map(({ title, user, description, createdAt, id }) => {
                return (
                  <li className='border p-4 shadow-sm rounded-md'>
                    <h3 className='font-semibold text-xl text-slate-600'>
                      {title}
                    </h3>
                    <label className='text-sm text-slate-500'>
                      Posted By <strong>{user.name}</strong> at{' '}
                      {moment(createdAt).format('DD/MM/YY HH:mm')}
                    </label>
                    <div className='truncate overflow-ellipsis line-clamp-2 text-opacity-90 p-2 rounded-md bg-slate-100 mt-2'>
                      {ReactHtmlParser(description)}
                    </div>
                    <div className='py-4'>
                      <Link
                        to={`/forum/${id}`}
                        className='border py-2 px-6 bg-lightBlue-600 text-white rounded-md text-sm hover:bg-blueGray-900'
                      >
                        Lihat Forum
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
