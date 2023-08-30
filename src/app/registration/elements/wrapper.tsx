import { ReactNode } from 'react';
import style from '../page.module.css';

interface LabelProps {
  children: ReactNode;
  label: string;
}

export default function Label({ children, label }: LabelProps) {
  return (
    <>
      <label className={style.labelInput}>
        {label}: <span className="text-rose-600">*</span>
        {children}
      </label>
    </>
  );
}
