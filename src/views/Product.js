import React, { useEffect, useState } from 'react';

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
  DeleteProduct,
  GetProduct,
  SetDetail,
  selectProduct,
} from '../slices/ProductSlice/index.ts';
import { selectAuth } from '../slices/AuthSlice/index.ts';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [params, setParams] = useState({
    search: '',
    page: 1,
    orderBy: 'id',
    order: 'desc',
    size: 10,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, progress, formResult } = useAppSelector(selectProduct);
  const accesses = useAppSelector(selectAuth).userData?.role?.accesses;

  useEffect(() => {
    dispatch(GetProduct(params));
  }, [dispatch, params, formResult]);

  const columns = [
    {
      field: '_1',
      label: 'No',
      className: 'nowrap',
      w: 'w-[40px] max-w-[40px] md:w-[60px] md:max-w-[60px]',
      func: (obj) => obj.index + 1 + (params.page - 1) * params.size,
    },

    { field: 'name', label: 'Nama', sort: true },
    {
      field: 'price',
      label: 'Harga',
      sort: true,
      func: ({ value }) => Number(value).toLocaleString('id-ID'),
    },
    {
      field: '_',
      label: 'Aksi',
      w: 'w-[40px] max-w[40px] md:w-[100px] md:max-w-[100px]',
      func: ({ row }) => (
        <div className='flex gap-1 flex-col md:flex-row'>
          {/* <button
            className='bg-lightBlue-500 items-center justify-center gap-2.5 rounded-md bg-meta-5 px-2 py-2 w-10 inline-flex text-center font-medium text-white hover:bg-opacity-90'
            onClick={() => {
              setDetail({ ...row, _action: 'view' });
              setOpenModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} size='xs' />
          </button> */}

          <button
            disabled={!accesses?.includes('product_update')}
            className='bg-orange-500 items-center justify-center gap-2.5 rounded-md bg-meta-6 disabled:bg-slate-200 disabled:cursor-not-allowed px-2 py-2 w-10 inline-flex text-center font-medium text-white hover:bg-opacity-90'
            onClick={() => {
              dispatch(SetDetail(row));
              navigate(`/data/product/${row.id}`);
            }}
          >
            <FontAwesomeIcon icon={faPencil} size='xs' />
          </button>

          <button
            disabled={!accesses?.includes('product_delete')}
            className='bg-red-500 items-center justify-center gap-2.5 rounded-md bg-meta-7 disabled:bg-slate-200 disabled:cursor-not-allowed px-2 py-2 w-10 inline-flex text-center font-medium text-white hover:bg-opacity-90'
            onClick={() => {
              if (confirm(`Anda akan menghapus product ${row.name}?`))
                dispatch(DeleteProduct(row.id));
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} size='xs' />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className='w-full h-screen overflow-y-auto'>
      <Navbar transparent />
      <main className='w-full'>
        <div className='items-center flex flex-wrap'></div>

        <BreadCrumb title={'Data Product'} />

        <section className='pt-10 pb-40 px-6 md:px-0'>
          <div className='container mx-auto'>
            <MyTable
              columns={columns}
              data={data?.rows || []}
              params={params}
              setParams={(val) => setParams(val)}
              count={data?.count || 0}
              onChange={(val) => setParams({ ...params, ...val })}
              progress={progress}
              hover
              addButton={
                <button
                  disabled={!accesses?.includes('product_create')}
                  className='bg-lightBlue-600 inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:bg-slate-400 disabled:cursor-not-allowed'
                  onClick={() => {
                    navigate('/data/produk/create');
                    dispatch(SetDetail(null));
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Tambah
                </button>
              }
            />
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
