import style from '../../../registration/page.module.css';
import PasswordValid from '@/app/registration/components/password/passwordValid';
import Label from '@/app/registration/elements/wrapper';
import { useEffect, useState } from 'react';

interface InputPasswordChangeProps {
  onUpdateOldPass: (oldpassword?: string) => void;
  onUpdateNewPass: (newpassword?: string) => void;
  onUpdateConfirmPass: (confirmpassword?: string) => void;
}

export default function InputPasswordChange({
  onUpdateOldPass,
  onUpdateNewPass,
  onUpdateConfirmPass,
}: InputPasswordChangeProps) {
  const [oldPassword, setOldPassword] = useState<string | undefined>('');
  const [newPassword, setNewPassword] = useState<string | undefined>('');
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>('');
  const [formValid, setFormValid] = useState(false);
  onUpdateOldPass(oldPassword);
  onUpdateNewPass(newPassword);
  onUpdateConfirmPass(confirmPassword);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zа-яA-ZА-Я\d\S]{8,}$/;
    const allPassword = [oldPassword, newPassword, confirmPassword];
    const result = allPassword.map((password) => passwordRegex.test(password!));
    setFormValid(result[0] && result[1] && result[2]);
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <>
      <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">
        Change password
      </h1>
      <div className="font-serif flex justify-center flex-col items-center w-full">
        <div className="lg:w-3/6 md:w-4/5 sm:w-4/5 min-[320px]:w-4/5">
          <p className="mb-4">To change the password for your Ostara Glass account, use this form</p>
          <Label label="Current Password">
            <PasswordValid
              password={oldPassword}
              onUpdate={(password) => {
                setOldPassword(password);
              }}
            />
          </Label>
          <Label label="New Password">
            <PasswordValid
              password={newPassword}
              onUpdate={(password) => {
                setNewPassword(password);
              }}
            />
          </Label>
          <Label label="Reenter new password">
            <PasswordValid
              password={confirmPassword}
              onUpdate={(password) => {
                setConfirmPassword(password);
              }}
            />
          </Label>
          <div className="flex gap-4 my-8">
            <button
              className={style.sentFormBtn}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
            >
              Reset
            </button>
            <button className={style.sentFormBtn} type="submit" disabled={!formValid}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
