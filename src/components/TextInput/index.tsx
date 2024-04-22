// import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import Editor from 'react-simple-wysiwyg';

export interface TextInputInterface {
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  register: any;
  readOnly?: boolean;
  layout?: string;
  options?: any[];
  hidden?: boolean;
  isMulti?: boolean;
  field?: any;
  formatOptionLabel?: any;
  accept?: string;
  ref?: string;
  errors?: any;
  value?: string;
  setValue?: void;
  step?: number;
  leftIcon?: any;
  rightIcon?: any;
  required?: boolean;
  min?: number;
  max?: number;
  onChange: (value: any) => void;
}

const TextInput: FC<TextInputInterface> = ({
  name,
  type,
  placeholder,
  defaultValue,
  className,
  label,
  readOnly,
  layout,
  options,
  hidden,
  isMulti,
  field,
  formatOptionLabel,
  accept,
  ref,
  register,
  errors,
  value,
  setValue,
  step,
  leftIcon,
  rightIcon,
  required,
  min,
  max,
  onChange,
}): JSX.Element => {
  const error = type !== 'button' && errors[name];

  return (
    <div>
      <div
        className={`form-control w-full ${
          layout === 'horizontal' ? 'flex flex-row items-center' : ''
        }`}
      >
        {label && !leftIcon && !rightIcon && (
          <label
            className={`label ${layout === 'horizontal' ? 'w-3/12' : 'w-full'}`}
          >
            <span className={`label-text ${type === 'button' && 'invisible'}`}>
              {label} {required && <span className='text-red-800'>*</span>}
            </span>
          </label>
        )}{' '}
        <div
          className={`${(leftIcon || rightIcon) && 'input-group'} ${
            layout === 'horizontal' ? 'w-9/12' : 'w-full'
          }`}
        >
          {leftIcon && <span className='bg-primary'>{leftIcon}</span>}

          {type === 'wysiwyg' ? (
            <Editor
              value={value}
              onChange={onChange}
              containerProps={{ style: { minHeight: '200px' } }}
            />
          ) : type === 'textarea' ? (
            <textarea
              id={name}
              readOnly={readOnly}
              disabled={readOnly}
              defaultValue={defaultValue}
              {...register}
              className={`textarea textarea-bordered leading-5 ${
                error && 'input-error'
              } h-24 w-full ${className}`}
              placeholder={placeholder}
            />
          ) : type === 'select' ? (
            <select
              className={`select select-bordered py-2.5 rounded-md ${
                error && 'input-error'
              } w-full  ${className}`}
              id={name}
              readOnly={readOnly}
              disabled={readOnly}
              defaultValue={defaultValue}
              {...register}
            >
              <option value={''} className='textarea-disabled'>
                {placeholder || 'Pilih'}
              </option>
              {options?.map((opt, i) => {
                return (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          ) : type === 'button' ? (
            <button
              className={`btn btn-primary`}
              type='submit'
              // disabled={progress}
            >
              {' '}
              {value}
            </button>
          ) : type === 'switch' ? (
            <label className='cursor-pointer label inline-flex justify-start gap-2 items-center'>
              <input
                {...register}
                type='checkbox'
                className='toggle toggle-sm toggle-primary'
              />
              <span className='label-text'>{placeholder}</span>
            </label>
          ) : type === 'switch2' ? (
            <label className='cursor-pointer label inline-flex gap-2 items-center'>
              <input
                {...register}
                type='checkbox'
                className='toggle toggle-sm toggle-primary'
              />
              <span className='label-text'>{placeholder}</span>
            </label>
          ) : type === 'time-range' ? (
            <div className='flex '>
              <input
                type='time'
                className={`input input-bordered rounded-none rounded-tl-3xl rounded-bl-3xl  max-w-[120px] ${
                  error && 'input-error'
                } w-full ${className}`}
              />
              <input
                type='time'
                className={`input rounded-none rounded-tr-3xl rounded-br-3xl input-bordered max-w-[120px] ${
                  error && 'input-error'
                } w-full ${className}`}
              />
            </div>
          ) : type === 'file' ? (
            <input
              onChange={(e) =>
                typeof onChange === 'function' && onChange(e.target.files)
              }
              type={'file'}
              placeholder={placeholder}
              id={name}
              readOnly={readOnly}
              disabled={readOnly}
              defaultValue={defaultValue}
              step={step}
              {...register}
              min={min}
              max={max}
              className={`border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                error && 'input-error'
              } w-full ${className}`}
            />
          ) : (
            <input
              type={type}
              placeholder={placeholder}
              id={name}
              readOnly={readOnly}
              disabled={readOnly}
              defaultValue={defaultValue}
              step={step}
              {...register}
              min={min}
              max={max}
              className={`border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                error && 'input-error'
              } w-full ${className}`}
            />
          )}
        </div>
      </div>
      {error && (
        <label className='label w-full label-text-alt justify-end text-red-500 text-sm'>
          {error.message}
        </label>
      )}
    </div>
  );
};
export default TextInput;
