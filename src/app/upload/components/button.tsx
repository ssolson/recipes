'use client';

import { useFormStatus } from 'react-dom';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Button({ type, label, onClick }: ButtonProps) {
  const { pending } = useFormStatus();
  const typeBtn = type ? type : 'button';
  const classBtn = pending
    ? 'bg-slate-700 text-slate-600 cursor-not-allowed'
    : 'bg-slate-100 text-slate-800 cursor-default';

  return (
    <button
      type={typeBtn}
      onClick={onClick}
      className={`px-2 py-1 mt-2 rounded-md font-semibold outline-none ${classBtn} transition ease-in-out duration-150`}
      disabled={pending}
    >
      {pending ? 'Loading...' : label}
    </button>
  );
}
