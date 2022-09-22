import stc from 'string-to-color';

import { getInitials } from '@/lib/name';

export default function Avatar({ name }) {
  return (
    <span
      className='inline-flex h-10 w-10 items-center justify-center rounded-full'
      style={{ backgroundColor: stc(name || '?') }}
    >
      <span className='text-sm font-medium leading-none text-white'>
        {getInitials(name)}
      </span>
    </span>
  );
}
