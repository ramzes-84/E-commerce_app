import style from '../../../registration/page.module.css';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ChangePasswordPopup from './popup/passwordChangePopup';
import InputPasswordChange from './inputPasswordChange';

interface PasswordProps {
  password?: string;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  title: string;
}

export default function PasswordChange({ password, setPassword, title }: PasswordProps) {
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (isEditing) {
  //     setIsSaving(true);
  //     setIsEditing(false);
  //   } else {
  //     setIsSaving(false);
  //     await handleSubmit(event);
  //     setIsEditing(true);
  //   }
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setPassword(value);
  };

  return (
    <>
      <form data-testid="wrapper-form" className="relative">
        <fieldset disabled>
          <legend className="text-lg py-1 font-bold text-emerald-800 m-1.5">{title}</legend>
          {error && <p className={style.errorMessage}>{error}</p>}
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className={`${style.input} relative`}
            data-testid="input-password"
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
              <InputPasswordChange currentPassword={password} />
            </ChangePasswordPopup>,
            document.body
          )}
      </form>
    </>
  );
}
