import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/AuthNavbar.js';
import BreadCrumb from '../components/Breadcrumb/index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import TextInput from '../components/TextInput/index.tsx';
import {
  selectRole,
  Access,
  CreateRole,
  UpdateRole,
  NullFormResult,
  GetOneRole,
} from '../slices/RoleSlice/index.ts';
import { toPascalCase } from '../utils/helper.ts';

function RoleForm() {
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
  } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NullFormResult());
  }, [dispatch]);

  const onSubmit = (data) => {
    const pl = {
      ...data,
      accesses: data.accesses.reduce((a, b) => {
        const checks = b.items
          .filter(({ checked }) => checked === true, [])
          ?.map(({ value }) => `${value}`, []);
        return [...a, ...checks];
      }, []),
    };

    if (!data.id) dispatch(CreateRole(pl));
    else dispatch(UpdateRole(pl));
  };

  const { detail, formResult } = useAppSelector(selectRole);

  useEffect(() => {
    if (!detail && lastPath !== 'create' && lastPath !== '')
      dispatch(GetOneRole(Number(lastPath)));
  }, [dispatch, lastPath, detail]);

  useEffect(() => {
    if (detail) setValue('id', detail.id);
    setValue('name', detail?.name || '');
    const accesses = Object.values(
      Object.values(Access).reduce((a, b) => {
        const [k1, k2] = b.split('_');
        a[k1] = a[k1] || { group: k1, items: [] };
        a[k1].items.push({ checked: false, value: b, label: k2 });
        return a;
      }, {})
    );
    accesses?.forEach(({ group, items }, i) => {
      setValue(`accesses.${i}.group`, group);
      items.forEach(({ label, value }, x) => {
        console.log(value, detail?.accesses.includes(value), detail?.accesses);
        setValue(`accesses.${i}.items.${x}.value`, value);
        setValue(
          `accesses.${i}.items.${x}.checked`,
          detail?.accesses.includes(value)
        );
        setValue(`accesses.${i}.items.${x}.label`, label);
      });
    });
  }, [setValue, Access, detail]);

  const watchAccesses = watch('accesses');

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult) {
      navigate('/data/role');
      dispatch(NullFormResult());
    }
  }, [formResult]);

  useEffect(() => {
    console.log(watchAccesses);
  }, [watchAccesses]);
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb
          goBack={true}
          title={`${lastPath === 'create' ? 'Tambah' : 'Edit'} User Role`}
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
                  <div>
                    <label>Akses :</label>
                    {watchAccesses?.map((r, i) => {
                      return (
                        <div
                          key={r.group}
                          className='flex gap-2 content-center mb-2'
                        >
                          <div className='w-[140px] pt-[5px]'>
                            {toPascalCase(r.group.replace('_', ' '))}
                          </div>
                          <div className='pt-[4px]'>:</div>
                          <div>
                            {r.items?.map((item, x) => {
                              return (
                                <label
                                  key={`${item.label}-${x}`}
                                  className='cursor-pointer label inline-flex gap-2 items-center mr-4'
                                >
                                  <input
                                    {...register(
                                      `accesses.${i}.items.${x}.checked`
                                    )}
                                    type='checkbox'
                                    // defaultChecked={watch(
                                    //   `accesses.${i}.items.${x}.checked`
                                    // )}
                                    className='toggle toggle-xs toggle-primary'
                                    onChange={() => {
                                      console.log('ok');
                                    }}
                                  />
                                  <span className='label-text'>
                                    {toPascalCase(item.label)}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
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

export default RoleForm;
