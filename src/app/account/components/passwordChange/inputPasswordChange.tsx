import style from '../../../registration/page.module.css';
import PasswordValid from '@/app/registration/components/password/passwordValid';
import Label from '@/app/registration/elements/wrapper';
import { IMyCustomer } from '@/service/api/CustomerService';
import { useEffect, useState } from 'react';
import { updatePassword } from '../../account-actions';
import SuccessPopup from '../popup/successPopup';

interface InputPasswordChangeProps {
  customer: IMyCustomer;
  onClose: () => void;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputPasswordChange({ customer, onClose, setIsSaving }: InputPasswordChangeProps) {
  const [oldPassword, setOldPassword] = useState<string | undefined>('');
  const [newPassword, setNewPassword] = useState<string | undefined>('');
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>('');
  const [chageMessage, setChageMessage] = useState('');
  const [successChange, setSuccessChange] = useState(false);
  const [errorChange, setErrorChange] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zа-яA-ZА-Я\d\S]{8,}$/;
    const allPassword = [oldPassword, newPassword, confirmPassword];
    const result = allPassword.map((password) => passwordRegex.test(password!));
    setFormValid(result[0] && result[1] && result[2]);
  }, [oldPassword, newPassword, confirmPassword]);

  const processResult = (message: string, isSuccess?: boolean, isError?: boolean) => {
    isSuccess ? setSuccessChange(isSuccess) : isError ? setErrorChange(isError) : null;
    setChageMessage(message);
    setTimeout(() => {
      isSuccess ? setSuccessChange(!isSuccess) : isError ? setErrorChange(!isError) : null;
    }, 3000);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      processResult(`New password and repeated password mismatch!`, undefined, true);
      return;
    }
    try {
      if (newPassword && oldPassword) await updatePassword(customer, newPassword, oldPassword);
      onClose();
      setIsSaving(true);
    } catch (err) {
      setIsSaving(false);
      processResult('Error occurred while changing password!', undefined, true);
    }
  };

  return (
    <>
      <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">
        Change password
      </h1>
      <div className="font-serif flex justify-center flex-col items-center w-full">
        <SuccessPopup message={chageMessage} successChange={successChange} errorChange={errorChange} />
        <div className="lg:w-3/6 md:w-4/5 sm:w-4/5 min-[320px]:w-4/5">
          <p className="mb-4">To change the password for your Ostara Glass account, use this form</p>
          <form onSubmit={handleFormSubmit}>
            <Label label="Current Password">
              <PasswordValid password={oldPassword} setPassword={setOldPassword} />
            </Label>
            <Label label="New Password">
              <PasswordValid password={newPassword} setPassword={setNewPassword} />
            </Label>
            <Label label="Reenter new password">
              <PasswordValid password={confirmPassword} setPassword={setConfirmPassword} />
            </Label>
            <div className="flex gap-4 my-8">
              <span
                className={style.sentFormBtn}
                onClick={() => {
                  setOldPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                Reset
              </span>
              <button className={style.sentFormBtn} type="submit" disabled={!formValid}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
