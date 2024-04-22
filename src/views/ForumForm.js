import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectForum,
  CreateForum,
  UpdateForum,
  NullFormResult,
  GetOneForum,
} from '../slices/ForumSlice/index.ts';
import { toPascalCase } from '../utils/helper.ts';

function ForumForm() {
  const location = useLocation();
  const [lastPath, setLastPath] = useState('');
  useEffect(() => {
    setLastPath(location.pathname.split('/').slice(-1)[0]);
  }, [location]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NullFormResult());
  }, [dispatch]);

  const onSubmit = (data) => {
    const pl = {
      ...data,
    };

    if (!data.id) dispatch(CreateForum(pl));
    else dispatch(UpdateForum(pl));
  };

  const { detail, formResult } = useAppSelector(selectForum);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneForum(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('title', detail?.title || '');
    setValue('description', detail?.description || '');
  }, [setValue, detail]);

  const watchAccesses = watch('accesses');

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/forum');
      dispatch(NullFormResult());
    }
  }, [formResult]);
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb
          goBack={true}
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} User Forum`}
        />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto flex flex-wrap items-center'>
            <div className='w-full flex flex-col'>
              <div className='w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='title'
                      type='text'
                      label='Judul'
                      placeholder='Judul'
                      register={register('title', {
                        required: 'Judul harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <Controller
                      control={control}
                      name='description'
                      rules={{
                        required: {
                          value: true,
                          message: 'Keterangan harus dipilih',
                        },
                      }}
                      render={({ field: { onChange, name, value } }) => (
                        <TextInput
                          layout='horizontal'
                          name={name}
                          value={value}
                          register={register('description', {
                            required: 'Keterangan harus diisi',
                          })}
                          type='wysiwyg'
                          className='input-mds'
                          label='Keterangan'
                          placeholder='Keterangan'
                          errors={errors}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <hr className='my-6' />
                  <button className='bg-lightBlue-600 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-slate-400 disabled:cursor-not-allowed'>
                    SIMPAN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ForumForm;
