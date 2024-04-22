import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectUser,
  CreateUser,
  UpdateUser,
  NullFormResult,
  GetOneUser,
} from '../slices/UserSlice/index.ts';
import { GetOptRole, selectRole } from '../slices/RoleSlice/index.ts';

function KaryawanForm() {
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
  } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NullFormResult());
    dispatch(GetOptRole(''));
  }, [dispatch]);

  const { detail, formResult } = useAppSelector(selectUser);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneUser(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  const onSubmit = (data) => {
    const pl = {
      ...data,
      roleId: Number(data.roleId),
    };

    if (!data.id) dispatch(CreateUser(pl));
    else dispatch(UpdateUser(pl));
  };

  const { opt: roleOpt } = useAppSelector(selectRole);

  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('name', detail?.name || '');
    setValue('email', detail?.email || '');
    setValue('username', detail?.username || '');
    setValue('roleId', detail?.roleId || '');
    setValue('isAdmin', detail?.isAdmin || '');
  }, [setValue, detail]);

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/karyawan');
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
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} User/Karyawan`}
        />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container px-4 mx-auto flex flex-wrap items-center'>
            <div className='w-full flex flex-col'>
              <div className='w-1/2'>
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
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='email'
                      type='text'
                      label='Email'
                      placeholder='Email'
                      register={register('email', {
                        required: 'Email harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='username'
                      type='text'
                      label='Usernmae'
                      placeholder='Usernmae'
                      register={register('username', {
                        required: 'Usernmae harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='roleId'
                      type='select'
                      label='Role'
                      placeholder='Role'
                      register={register('roleId', {
                        required: 'Role harus diisi',
                      })}
                      errors={errors}
                      options={roleOpt || []}
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      layout='horizontal'
                      name='isAdmin'
                      type='switch2'
                      label='Is Admin'
                      placeholder='Is Admin'
                      register={register('isAdmin')}
                      errors={errors}
                      defaultValue=''
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

export default KaryawanForm;
