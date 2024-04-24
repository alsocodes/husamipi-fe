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
  CreateForum,
  DeleteForum,
  GetForum,
  GetOneForum,
  SetDetail,
  selectForum,
} from '../slices/ForumSlice/index.ts';
import { selectAuth } from '../slices/AuthSlice/index.ts';
import { Link, useLocation } from 'react-router-dom';
import TextInput from '../components/TextInput/index.tsx';
import { useForm } from 'react-hook-form';

export default function ForumPageDetail() {
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
  const { detail, formResult } = useAppSelector(selectForum);
  useEffect(() => {
    if (lastPath) dispatch(GetOneForum(Number(lastPath)));
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

    dispatch(CreateForum(pl));
  };

  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb goBack={true} title={`Forum : ${detail?.title}`} />

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
              <div className='border-t my-4 flex justify-between'>
                <div className='text-sm py-2'>
                  Berikan tanggapan mu di kolom komentar!
                </div>
                <div className='text-sm py-2'>
                  {detail?.childs?.length} komentar
                </div>
              </div>
              <div className='flex flex-col gap-6'>
                {!detail?.childs.length ? (
                  <></>
                ) : (
                  <div>
                    {detail?.childs?.map((data, i) => {
                      return (
                        <div
                          className='flex w-full gap-4 items-start mb-4'
                          key={i}
                        >
                          <div className='w-12 h-12 bg-slate-300 rounded-full flex-shrink-0'></div>
                          <div>
                            <div className='bg-slate-100 p-4 rounded-lg w-full text-sm'>
                              {ReactHtmlParser(data.description)}
                            </div>
                            <label className='text-sm text-slate-500'>
                              By <strong>{data?.user.name}</strong> at{' '}
                              {moment(data?.createdAt).format('DD/MM/YY HH:mm')}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className='flex w-full gap-4 items-start'>
                  <div className='w-12 h-12 bg-slate-300 rounded-full flex-shrink-0'></div>
                  <div className='bg-slate-100 p-4 rounded-lg w-full min-h-20'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextInput
                        layout='vertical'
                        name='description'
                        type='textarea'
                        placeholder='Komentar'
                        register={register('description', {
                          required: 'Komentar harus diisi',
                        })}
                        errors={errors}
                        defaultValue=''
                      />
                      <button className='bg-lightBlue-600 py-2 px-6 text-white rounded-lg gap-2 flex items-center my-2'>
                        <FontAwesomeIcon icon={faPaperPlane} /> {'        '}
                        Kirim
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
