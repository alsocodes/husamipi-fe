import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

import * as moment from 'moment';
// components

import Navbar from '../components/Navbars/AuthNavbar.js';
import MyTable from '../components/MyTable/index.tsx';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faPencil,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import {
  CreateMateri,
  DeleteMateri,
  GetMateri,
  GetOneMateri,
  SetDetail,
  selectMateri,
} from '../slices/MateriSlice/index.ts';
import { selectAuth } from '../slices/AuthSlice/index.ts';
import { Link, useLocation } from 'react-router-dom';
import TextInput from '../components/TextInput/index.tsx';
import { useForm } from 'react-hook-form';

export default function MateriPageDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const [lastPath, setLastPath] = useState('');
  useEffect(() => {
    setLastPath(location.pathname.split('/').slice(-1)[0]);
  }, [location]);

  const dispatch = useAppDispatch();
  const { detail, formResult } = useAppSelector(selectMateri);
  useEffect(() => {
    if (lastPath) dispatch(GetOneMateri(Number(lastPath)));
  }, [lastPath, dispatch, formResult]);

  useEffect(() => {
    reset();
  }, [formResult]);

  const onSubmit = (data) => {
    const pl = {
      title: `re-${detail?.title}-${new Date().getTime()}`,
      ...data,
      parentId: detail?.id,
    };

    dispatch(CreateMateri(pl));
  };

  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb goBack={true} title={`Materi : ${detail?.title}`} />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto'>
            <div className='max-w-5xl'>
              <h3 className='font-semibold text-2xl text-slate-600 mb-4'>
                {detail?.title}
              </h3>
              <label className='text-sm text-slate-500'>
                Posted By <strong>{detail?.user.name}</strong> at{' '}
                {moment(detail?.createdAt).format('DD/MM/YY HH:mm')}
              </label>
              <div className='text-opacity-90 p-6 rounded-md bg-slate-100 mt-2 text-md '>
                {ReactHtmlParser(detail?.description)}
              </div>
              <div className='border-t my-4 flex justify-between'></div>
              <h4 className='font-semibold text-lg text-slate-600 mb-4'>
                Lampiran ({detail?.attachments?.length})
              </h4>
              {detail?.attachments.length ? (
                <div>
                  <table className='w-full'>
                    <thead>
                      <tr className='text-left'>
                        <th className='p-2 '>No</th>
                        <th className='p-2 '>Nama</th>
                        <th className='p-2 '>Jenis</th>
                        <th className='p-2 '>Link</th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                      {detail?.attachments?.map(({ name, source, type }, i) => (
                        <tr>
                          <td className='p-2 border-b border-slate-200'>
                            {i + 1}
                          </td>
                          <td className='p-2 border-b border-slate-200'>
                            {name}
                          </td>
                          <td className='p-2 border-b border-slate-200'>
                            {type}
                          </td>
                          <td className='p-2 border-b border-slate-200'>
                            <a
                              className='text-blue-800'
                              href={`${source}`}
                              target='_blank'
                            >
                              {source}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
