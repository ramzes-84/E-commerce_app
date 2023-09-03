import style from '../../../registration/page.module.css';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ChangePasswordPopup from './popup/passwordChangePopup';
import InputPasswordChange from './inputPasswordChange';
import { IMyCustomer } from '@/service/api/CustomerService';

interface PasswordProps {
  title: string;
  customer: IMyCustomer;
  setSavePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordChange({ title, customer, setSavePassword }: PasswordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  setSavePassword(isSaving);

  return (
    <>
      <form data-testid="wrapper-form" className="relative">
        <fieldset disabled>
          <legend className="text-lg py-1 font-bold text-emerald-800 m-1.5">{title}</legend>
          <input
            type="password"
            name="password"
            className={`${style.input} relative`}
            data-testid="input-password"
            defaultValue={customer.password}
            readOnly
          />
        </fieldset>
        <button
          className="absolute top-10 right-2 p-1.5 rounded-[50%] transition-property: all duration-300 group/item hover:bg-[#e5ea5976]"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
        >
          {!isOpen && <FaPencilAlt style={{ color: '#276339' }} title="Edit" />}
        </button>
        {isOpen &&
          createPortal(
            <ChangePasswordPopup
              onClose={(event) => {
                event.preventDefault();
                setIsOpen(false);
              }}
            >
              <InputPasswordChange customer={customer} onClose={() => setIsOpen(false)} setIsSaving={setIsSaving} />
            </ChangePasswordPopup>,
            document.body
          )}
      </form>
    </>
  );
}
