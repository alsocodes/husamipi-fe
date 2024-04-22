import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, createRef, useEffect, useState } from 'react';
import SortableTH from '../SortableTH/index.tsx';

export type ColumnType = {
  field: string;
  label: string;
  className?: string;
  func?: (data?: any) => void;
  sort?: boolean;
  w?: string;
};
type MyTableParamType = {
  search?: string;
  size: number;
  orderBy: string;
  order: string;
  page: number;
};
type MyTableType = {
  params: MyTableParamType;
  setParams: (val: any) => void;
  count?: number;
  data: any[];
  columns: ColumnType[];
  hover?: boolean;
  zebra?: boolean;
  progress: boolean;
  onChange?: any;
  onAdd?: any;
  filterComponent?: JSX.Element;
  shadow?: boolean;
  addButton?: JSX.Element;
};
const MyTable: FC<MyTableType> = ({
  params,
  count = 1,
  columns,
  data,
  // hover = false,
  // zebra = true,
  progress,
  onChange,
  filterComponent = null,
  // shadow = true,
  addButton,
}) => {
  const { search, page, size, orderBy, order } = params;
  const pageingButtons = paginationGenerator(page, Math.ceil(count / size));

  const showFrom = (page - 1) * size;
  const showTo = Math.min(showFrom + size, count);

  const onParamChange = (data: any) => {
    if (progress) return;
    onChange(data);
  };

  const [onTypeSearch, setOnTypeSearch] = useState<string | null>();

  useEffect(() => {
    if (onTypeSearch === undefined) return;
    const timeOutId = setTimeout(
      () => onParamChange({ search: onTypeSearch, page: 1 }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [onTypeSearch]);

  const searchRef = createRef<HTMLInputElement>();

  return (
    <div>
      {/* table */}
      <div className='rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
        <div className='flex gap-2 justify-between w-full mb-3 py-2'>
          {filterComponent}
          {typeof search !== 'undefined' && (
            <div className='relative'>
              <input
                ref={searchRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onParamChange({ search: onTypeSearch, page: 1 });
                  }
                }}
                onChange={(e) => setOnTypeSearch(e.target.value)}
                type='text'
                placeholder='Pencarian'
                className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
              />
              <button
                onClick={() => {
                  if (searchRef.current) searchRef.current.value = '';
                  setOnTypeSearch('');
                }}
                className={`btn btn-xs btn-circle rounded-full absolute right-2 top-3.5
                  ${!onTypeSearch?.length && 'invisible'}  
                `}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
          {addButton}
          {/* {typeof onAdd !== 'undefined' && (
            <button
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => onAdd()}
            >
              <FontAwesomeIcon icon={faPlus} />
              Tambah
            </button>
          )} */}
        </div>
        <div className='max-w-full overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                {columns?.map(({ label, sort, w, field }, i) => {
                  return (
                    <th
                      className={`sticky p-4 font-medium text-black dark:text-white ${w}`}
                      key={`th-${i}`}
                    >
                      {/* {label} */}
                      {sort ? (
                        <SortableTH
                          field={field}
                          active={orderBy === field}
                          mode={order}
                          label={label}
                          toggle={(data: any) => onParamChange({ ...data })}
                        />
                      ) : (
                        label
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-3 dark:hover:bg-meta-4'
                >
                  {columns.map((c, ii) => {
                    const { field, func, w, className } = c;

                    let value =
                      field.split('.').length > 1
                        ? row[field.split('.')[0]]?.[field.split('.')[1]]
                        : row[field];
                    if (typeof func === 'function') {
                      value = func({ value: value, row, index });
                    }
                    return (
                      <td
                        key={`row-${index}-${ii}`}
                        className={`border-b border-[#eee] p-4 dark:border-strokedark`}
                      >
                        <div className={`${w} ${className}`}>{value}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className='flex py-2 justify-between mt-2 mb-2'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <div className='flex'>
              {pageingButtons.map((p: any, i: number) => {
                const rounded =
                  pageingButtons.length === 1
                    ? 'rounded-md'
                    : i === 0
                    ? 'rounded-tl-md rounded-bl-md '
                    : i === pageingButtons.length - 1
                    ? 'rounded-tr-md rounded-br-md '
                    : '';
                const active =
                  p === page
                    ? 'bg-primary text-white'
                    : 'bg-meta-2 text-meta-4 ';
                return (
                  <button
                    onClick={() =>
                      onParamChange({
                        page: Number(p),
                      })
                    }
                    key={i}
                    className={`${rounded} ${active} 
                       border-stroke justify-center items-center
                      px-3 py-2 inline-flex text-center hover:bg-opacity-90 text-sm`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <div className='text-xs'>
              {(showFrom || 0) + 1} - {showTo || count} dari {count}
            </div>
          </div>
          <div className=''>
            <select
              className={`border bg-transparent py-2 px-2 rounded-md text-black outline-none
            focus-visible:shadow-none 
            focus:border-primary border-stroke
              dark:border-form-strokedark dark:bg-form-input
              dark:text-white dark:focus:border-primary`}
              value={size}
              onChange={(e) =>
                onParamChange({ size: Number(e.target.value), page: 1 })
              }
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={1000}>1000</option>
            </select>
          </div>
        </div>
        {/* pagination */}
      </div>
      {/* table */}
    </div>
  );
};

const paginationGenerator = (current: number, last: number, width = 2) => {
  const left = current - width;
  const right = current + width + 1;
  const range: number[] = [];
  const rangeWithDots: any = [];
  let l: number;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

export default MyTable;
