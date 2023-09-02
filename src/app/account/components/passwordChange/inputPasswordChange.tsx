import style from '../../../registration/page.module.css';
import PasswordValid from '@/app/registration/components/password/passwordValid';
import Label from '@/app/registration/elements/wrapper';
import { useState } from 'react';

interface InputPasswordChangeProps {
  currentPassword: string | undefined;
}

export default function InputPasswordChange({ currentPassword }: InputPasswordChangeProps) {
  const [oldPassword, setOldPassword] = useState<string | undefined>('');
  const [newPassword, setNewPassword] = useState<string | undefined>('');
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>('');
  const [error, setError] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (oldPassword !== newPassword) {
      setError('Current password is incorrect!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Password mismatch!');
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <>
      <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">
        Change password
      </h1>
      <div className="font-serif flex justify-center flex-col items-center w-full">
        <p className="mb-4">To change the password for your Ostara Glass account, use this form</p>
        <div className="w-3/6">
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
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                Reset
              </span>
              <button className={style.sentFormBtn} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
