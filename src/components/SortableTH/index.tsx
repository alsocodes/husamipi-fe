import { FC } from 'react';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  mode?: string;
  label: string;
  active?: boolean;
  toggle?: any;
  field?: any;
};

const SortableTH: FC<Props> = ({ mode, label, active, toggle, field }) => {
  return (
    <div
      className="group flex justify-start items-center cursor-pointer gap-2"
      onClick={() =>
        toggle({
          orderBy: field,
          order: mode === 'asc' ? 'desc' : 'asc',
        })
      }
    >
      <div className="">{label}</div>
      <div className="cursor-pointer group-hover:bg-base-300 py-2 px-3 rounded-md">
        <div className="flex flex-col -gap-4">
          <FontAwesomeIcon
            icon={faSortUp}
            size="1x"
            className={`${
              !active || mode === 'desc' ? 'text-slate-300' : 'text-slate-600'
            } -mb-[7px] `}
          />
          <FontAwesomeIcon
            icon={faSortDown}
            size="1x"
            className={`${
              !active || mode === 'asc' ? 'text-slate-300' : 'text-slate-600'
            } -mt-[7px]`}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableTH;
