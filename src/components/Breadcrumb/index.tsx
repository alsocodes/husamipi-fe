import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const index = ({ title, goBack = false }) => {
  const navigate = useNavigate();
  return (
    <section className='py-6 bg-blueGray-200 pt-24'>
      <div className='container px-4 mx-auto flex flex-wrap items-center gap-3 h-12'>
        {goBack && (
          <button
            onClick={() => navigate(-1)}
            className='px-4 py-2 border rounded-md border-slate-400 hover:bg-slate-300'
          >
            <FontAwesomeIcon icon={faArrowLeftLong} size='sm' />
          </button>
        )}
        <h3 className='font-semibold text-lg text-blueGray-500'>{title}</h3>
      </div>
    </section>
  );
};

export default index;
