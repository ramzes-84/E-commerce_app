import { ReactNode } from 'react';
import style from '../../style.module.css';

export default function Border({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className={`${style.borderItem}`}>
        <h2 className={`${style.borderTitle} lg:text-2xl md:text-xl sm:text-base`}>{title}</h2>
        {children}
      </div>
    </>
  );
}
