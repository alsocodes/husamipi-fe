import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { PostLogin, selectAuth } from '../../slices/AuthSlice/index.ts';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import TextInput from '../../components/TextInput/index.tsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { progress, loggedIn } = useAppSelector(selectAuth);

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      return navigate('/dashboard');
    }
  }, [loggedIn]);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    dispatch(PostLogin(data));
  };
  return (
    <div className='bg-blueGray-600 w-full h-screen overflow-y-scroll'>
      <div className='container mx-auto px-4 h-full '>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'></div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <h2 className='text-center font-bold text-2xl'>
                  PT Best Energy System
                </h2>
                <div className='text-blueGray-600 text-center mb-3 font-bold py-2'>
                  Sig In
                  {/* <small>Or sign in with credentials</small> */}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='my-4'>
                    <TextInput
                      name='username'
                      type='text'
                      // label='What is your username?'
                      placeholder='Username'
                      register={register('username', {
                        required: 'Username/Email harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>
                  <div className='my-4'>
                    <TextInput
                      name='password'
                      type='text'
                      // label='What is your password?'
                      placeholder='Password'
                      register={register('password', {
                        required: 'Password harus diisi',
                      })}
                      errors={errors}
                      defaultValue=''
                    />
                  </div>

                  <div>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        id='customCheckLogin'
                        type='checkbox'
                        className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                      />
                      <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className='text-center mt-6'>
                    <button
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='submit'
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex flex-wrap mt-6 relative'>
              <div className='w-1/2'>
                <a
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  className='text-blueGray-200'
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              {/* <div className='w-1/2 text-right'>
                <Link to='/auth/register' className='text-blueGray-200'>
                  <small>Create new account</small>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
