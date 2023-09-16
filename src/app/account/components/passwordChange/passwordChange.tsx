import style from '../../../registration/page.module.css';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import BigPopup from './popup/passwordChangePopup';
import InputPasswordChange from './inputPasswordChange';
import { IMyCustomer } from '@/service/api/CustomerService';

interface PasswordProps {
  title: string;
  customer: IMyCustomer;
  handleSubmitPasswordChange: (
    oldpassword?: string,
    newpassword?: string,
    confirmpassword?: string
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function PasswordChange({ title, customer, handleSubmitPasswordChange }: PasswordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>('');
  const [newPassword, setNewPassword] = useState<string | undefined>('');
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>('');

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
            <BigPopup
              onClose={(event) => {
                event.preventDefault();
                setIsOpen(false);
              }}
            >
              <form
                className="relative"
                onSubmit={handleSubmitPasswordChange(oldPassword, newPassword, confirmPassword)}
              >
                <InputPasswordChange
                  onUpdateOldPass={(oldpassword?: string) => setOldPassword(oldpassword)}
                  onUpdateNewPass={(newpassword?: string) => setNewPassword(newpassword)}
                  onUpdateConfirmPass={(confirmpassword?: string) => setConfirmPassword(confirmpassword)}
                />
              </form>
            </BigPopup>,
            document.body
          )}
      </form>
    </>
  );
}
