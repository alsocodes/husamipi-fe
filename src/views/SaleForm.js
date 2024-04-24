import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectSale,
  CreateSale,
  UpdateSale,
  NullFormResult,
  GetOneSale,
} from '../slices/SaleSlice/index.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GetOptProduct, selectProduct } from '../slices/ProductSlice/index.ts';
// import { toPascalCase } from '../utils/helper.ts';

function SaleForm() {
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
    unregister,
  } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NullFormResult());
  }, [dispatch]);

  const onSubmit = (data) => {
    const pl = {
      ...data,
      date: new Date(data.date),
      saleDetails: data.saleDetails?.map((d) => ({
        ...d,
        productId: Number(d.productId),
        price: Number(d.price),
        ppn: Number(d.ppn),
        qty: Number(d.qty),
      })),
    };
    console.log(pl);

    if (!data.id) dispatch(CreateSale(pl));
    else dispatch(UpdateSale(pl));
  };

  const { detail, formResult } = useAppSelector(selectSale);
  const { opt } = useAppSelector(selectProduct);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneSale(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('date', detail?.date || new Date());
    setValue('invoiceNumber', detail?.invoiceNumber || '');
    setValue('soNumber', detail?.soNumber || '');
    setValue('customer', detail?.customer || '');
    setDetails(
      detail?.saleDetails || [
        { productId: 0, price: 0, ppn: 0, total: 0, qty: 1 },
      ]
    );
  }, [setValue, detail]);

  useEffect(() => {
    unregister('saleDetails');
    details?.forEach((d, i) => {
      setValue(`saleDetails.${i}.productId`, d.productId);
      setValue(`saleDetails.${i}.price`, d.price);
      setValue(`saleDetails.${i}.ppn`, d.ppn);
      setValue(`saleDetails.${i}.qty`, d.qty);
      setValue(`saleDetails.${i}.totoal`, d.totoal);
    });
  }, [details]);

  useEffect(() => {
    dispatch(GetOptProduct(''));
  }, [dispatch]);

  const watchDetails = watch('saleDetails');

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/sale');
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
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} Sale`}
        />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto flex flex-wrap items-center'>
            <div className='w-full flex flex-col'>
              <div className='w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='date'
                      type='date'
                      label='Tanggal'
                      placeholder='Tanggal'
                      register={register('date', {
                        required: 'Tanggal harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='soNumber'
                      type='text'
                      label='No SO'
                      placeholder='No SO'
                      register={register('soNumber', {
                        required: 'No SO harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='invoiceNumber'
                      type='text'
                      label='No Invoice'
                      placeholder='No Invoice'
                      register={register('invoiceNumber', {
                        required: 'No Invoice harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='customer'
                      type='text'
                      label='Customer'
                      placeholder='Customer'
                      register={register('customer', {
                        required: 'Customer harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className=''>
                    <div className='flex items-center gap-4'>
                      <label>Produk</label>
                      <button
                        className='border py-2 px-4 border-slate-200 rounded-md bg-slate-100 hover:bg-slate-400'
                        type='button'
                        onClick={() => {
                          setDetails([
                            ...(watchDetails || []),
                            {
                              productId: 0,
                              price: 0,
                              ppn: 0,
                              total: 0,
                              qty: 1,
                            },
                          ]);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    {watchDetails?.map((data, key) => {
                      return (
                        <div
                          className='my-4 flex flex-row w-full gap-4 items-center'
                          key={key}
                        >
                          <TextInput
                            layout='vertical'
                            name={`saleDetails.${key}.productId`}
                            type='select'
                            label='Produk'
                            placeholder='Produk'
                            register={register(`saleDetails.${key}.productId`, {
                              required: 'Produk harus diisi',
                            })}
                            errors={errors}
                            defaultValue=''
                            options={opt || []}
                          />

                          <TextInput
                            layout='vertical'
                            name={`saleDetails.${key}.qty`}
                            type='number'
                            label='Qty'
                            placeholder='Qty'
                            register={register(`saleDetails.${key}.qty`, {
                              required: 'Qty harus diisi',
                            })}
                            errors={errors}
                            defaultValue=''
                          />

                          <TextInput
                            layout='vertical'
                            name={`saleDetails.${key}.price`}
                            type='number'
                            label='Harga'
                            placeholder='Harga'
                            register={register(`saleDetails.${key}.price`, {
                              required: 'Harga harus diisi',
                            })}
                            errors={errors}
                            defaultValue=''
                          />
                          <TextInput
                            layout='vertical'
                            name={`saleDetails.${key}.ppn`}
                            type='number'
                            label='PPN'
                            placeholder='PPN'
                            register={register(`saleDetails.${key}.ppn`, {
                              required: 'PPN harus diisi',
                            })}
                            errors={errors}
                            defaultValue=''
                          />
                          <button
                            className='border py-2 px-4 h-10 border-slate-200 rounded-md bg-red-500 hover:bg-slate-700'
                            type='button'
                            onClick={() => {
                              const tmp = (watchDetails || []).filter(
                                (_, ind) => ind != key,
                                []
                              );
                              // console.log(tmp, 'tmpx');
                              // console.log(

                              // );
                              setDetails(
                                tmp?.length
                                  ? tmp
                                  : [
                                      {
                                        productId: 0,
                                        price: 0,
                                        ppn: 0,
                                        qty: 1,
                                        total: 0,
                                      },
                                    ]
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} color='white' />
                          </button>
                        </div>
                      );
                    })}
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

export default SaleForm;
