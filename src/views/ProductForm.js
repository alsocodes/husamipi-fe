import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectProduct,
  CreateProduct,
  UpdateProduct,
  NullFormResult,
  GetOneProduct,
} from '../slices/ProductSlice/index.ts';
import moment from 'moment';
import { selectAuth } from '../slices/AuthSlice/index.ts';
// import { toPascalCase } from '../utils/helper.ts';

function ProductForm() {
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
      price: Number(data.price),
    };

    if (!data.id) dispatch(CreateProduct(pl));
    else dispatch(UpdateProduct(pl));
  };

  const { detail, formResult } = useAppSelector(selectProduct);
  const { userData } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneProduct(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('name', detail?.name || '');
    setValue('price', detail?.price || 0);
  }, [setValue, detail]);

  const watchAccesses = watch('accesses');

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/produk');
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
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} Product`}
        />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto flex flex-wrap items-center'>
            <div className='w-full flex flex-col'>
              <div className='w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='name'
                      type='text'
                      label='Nama'
                      placeholder='Nama'
                      register={register('name', {
                        required: 'Nama harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  {userData?.role?.accesses?.includes('product_price') && (
                    <div className='my-4'>
                      <TextInput
                        layout='horizontal'
                        name='price'
                        type='text'
                        label='Harga'
                        placeholder='Harga'
                        register={register('price', {
                          required: 'Harga harus diisi',
                        })}
                        errors={errors}
                        defaultValue=''
                      />
                    </div>
                  )}

                  <hr className='my-6' />
                  <button className='bg-lightBlue-600 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-slate-400 disabled:cursor-not-allowed'>
                    SIMPAN
                  </button>

                  <h3 className='mt-10 font-semibold text-slate-600'>
                    Materi{' '}
                  </h3>
                  <ul className='mt-2'>
                    {detail?.materis?.map(
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

                          <p className='text-sm text-slate-500'>
                            {moment(createdAt).format('DD/MM/YY')} | Materi by{' '}
                            <span className='font-semibold'>{user.name}</span>
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductForm;
