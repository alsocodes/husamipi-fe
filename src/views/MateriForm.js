import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectMateri,
  CreateMateri,
  UpdateMateri,
  NullFormResult,
  GetOneMateri,
  UploadAttachments,
} from '../slices/MateriSlice/index.ts';
// import { toPascalCase } from '../utils/helper.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GetOptProduct, selectProduct } from '../slices/ProductSlice/index.ts';

function MateriForm() {
  const location = useLocation();
  const [lastPath, setLastPath] = useState('');
  useEffect(() => {
    setLastPath(location.pathname.split('/').slice(-1)[0]);
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    unregister,
    clearErrors,
  } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NullFormResult());
    dispatch(GetOptProduct(''));
  }, [dispatch]);

  const onSubmit = (data) => {
    const pl = {
      ...data,
      ...(data.productId ? { productId: Number(data.productId) } : {}),
    };

    console.log(data, pl);
    // return console.log(data);
    if (!data.id) dispatch(CreateMateri(pl));
    else dispatch(UpdateMateri(pl));
  };

  const { detail, formResult } = useAppSelector(selectMateri);
  const { opt: productOpt } = useAppSelector(selectProduct);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneMateri(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('title', detail?.title || '');
    setValue('description', detail?.description || '');
    setValue('productId', detail?.product?.id || '');
    setAttachments(detail?.attachments || []);
  }, [setValue, detail]);

  useEffect(() => {
    unregister('attachments');
    attachments?.forEach(({ name, type, source }, i) => {
      setValue(`attachments.${i}.name`, name);
      setValue(`attachments.${i}.type`, type);
      setValue(`attachments.${i}.source`, source);
    });
  }, [attachments]);

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/materi');
      dispatch(NullFormResult());
    }
  }, [formResult]);

  const watchAttachments = watch('attachments');
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb
          goBack={true}
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} Materi`}
        />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto flex flex-wrap items-center'>
            <div className='w-full flex flex-col'>
              <div className='w-3/2 max-w-full'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='productId'
                      type='select'
                      label='Produk'
                      placeholder='Produk'
                      register={register('productId')}
                      errors={errors}
                      defaultValue=''
                      options={productOpt || []}
                    />
                  </div>
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
                  <div className='my-4'>
                    <div className='flex items-start'>
                      <label className='w-3/12'>Lampiran</label>
                      <div className='w-9/12'>
                        {watchAttachments?.map(({ name, type, source }, i) => (
                          <div
                            className='mb-6 items-start'
                            key={`attachment-${i}`}
                          >
                            <div className='flex gap-2 '>
                              <div className='w-full'>
                                <TextInput
                                  layout='vertical'
                                  name={`attachments.${i}.name`}
                                  type='text'
                                  placeholder='Nama'
                                  register={register(`attachments.${i}.name`, {
                                    required: 'Nama harus diisi',
                                  })}
                                  errors={errors}
                                  className='w-full'
                                  defaultValue=''
                                />
                              </div>
                              <div className='w-full'>
                                <TextInput
                                  layout='vertical'
                                  name={`attachments.${i}.type`}
                                  type='select'
                                  placeholder='Jenis'
                                  register={register(`attachments.${i}.type`, {
                                    required: 'Jenis harus diisi',
                                  })}
                                  errors={errors}
                                  defaultValue=''
                                  options={[
                                    { value: 'image', label: 'Gambar' },
                                    { value: 'video', label: 'Video/Youtube' },
                                    { value: 'pdf', label: 'PDF' },
                                    { value: 'doc', label: 'Dokumen' },
                                    { value: 'xls', label: 'Excel' },
                                    { value: 'ppt', label: 'PPT' },
                                  ]}
                                />
                              </div>
                              <div className='w-full'>
                                {['image', 'pdf', 'doc', 'xls', 'ppt'].includes(
                                  type
                                ) ? (
                                  <div>
                                    <input
                                      accept={
                                        type === 'image'
                                          ? 'image/*'
                                          : type === 'pdf'
                                          ? 'application/pdf'
                                          : type === 'xls'
                                          ? 'application/vnd.ms-excel'
                                          : type === 'doc'
                                          ? 'application/vnd.ms-excel'
                                          : '*'
                                      }
                                      type='file'
                                      onChange={async (e) => {
                                        if (!e.target.files.length) return;
                                        // console.log(e.target.files);
                                        const res = await UploadAttachments(
                                          e.target.files[0]
                                        );
                                        if (res?.data?.link) {
                                          setValue(
                                            `attachments.${i}.source`,
                                            res.data.link
                                          );
                                          clearErrors(
                                            `attachments.${i}.source`
                                          );
                                        }
                                      }}
                                      className='border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                    />
                                  </div>
                                ) : (
                                  <TextInput
                                    layout='vertical'
                                    name={`attachments.${i}.source`}
                                    type={'text'}
                                    placeholder='File'
                                    register={register(
                                      `attachments.${i}.source`,
                                      {
                                        required: 'Link harus diisi',
                                      }
                                    )}
                                    errors={errors}
                                    defaultValue=''
                                  />
                                )}
                              </div>
                              <div className='flex'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const tmp = [
                                      ...watchAttachments.filter(
                                        (_, index) => index !== i
                                      ),
                                    ];
                                    setAttachments(
                                      tmp.length
                                        ? tmp
                                        : [{ name: '', type: '', source: '' }]
                                    );
                                  }}
                                  className='border bg-red-500 rounded-md py-1 px-4 h-10 border-slate-300 hover:bg-red-700 text-sm'
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size='sm'
                                    color='white'
                                  />
                                </button>
                              </div>
                            </div>
                            {source ? (
                              <a
                                className='text-sm underline text-blue-700'
                                href={source}
                                target='_blank'
                              >
                                {source}
                              </a>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                        <button
                          type='button'
                          onClick={() =>
                            setAttachments([
                              ...(watchAttachments || []),
                              { name: '', type: '', source: '' },
                            ])
                          }
                          className='border rounded-md py-1 px-4 h-10 border-slate-300 hover:bg-slate-200 text-sm my-2'
                        >
                          <FontAwesomeIcon icon={faPlus} size='sm' />
                          Tambah Lampiran
                        </button>
                      </div>
                    </div>
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

export default MateriForm;
