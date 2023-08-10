'use client'

import style from './page.module.css';
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Page() {
  const [email, setEmail] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postalcode, setPostalcode] = React.useState('');
  const [country, setCountry] = React.useState('');

  const emailRef = React.useRef(email);

  React.useEffect(() => {
    emailRef.current = email;
  }, [email]);

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let user; // при настройке API здесь будем искать нужного user и сравнивать со значением поля email

    
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className={style.container}>
        <form action="" onSubmit={handleRegistration}>
          <h2 className='text-center'>Registration</h2>
          <div>
            <div>
              <label>Email:
                <input type="email" name="email" multiple={false} pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$' value={email} onChange={(event) => setEmail(event.target.value.trim())} className={style.input}/>
              </label>
            </div>
            <div>
              <label>Password:
                <input type={passwordVisible ? 'text' : 'password'} name="password" pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$' minLength={8} value={password} onChange={(event) => setPassword(event.target.value.trim())} className={style.input}/>
              </label>
              <button onClick={togglePasswordVisibility}>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <div>
              <label>First Name:
                <input type="text" name="firstName" value={firstname} pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$" onChange={(event) => setFirstname(event.target.value.trim())} className={style.input}/>
              </label>
            </div>
            <div>
              <label>Last Name:
                <input type="text" name="lastName" value={lastname} pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$" onChange={(event) => setLastname(event.target.value.trim())} className={style.input}/>
              </label>
            </div>
            <div>
              <label>Date of birth:
                <input className={style.input} type="date" name="birthdate" pattern="^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$" value={birthdate} onChange={(event) => {
                  setBirthdate(event.target.value);
                  const birthdate = new Date(event.target.value);
                  const today = new Date();
                  const age = today.getFullYear() - birthdate.getFullYear();
                  if (age < 14) {
                    event.target.setCustomValidity('Вы должны быть старше 14 лет');
                  } else {
                    event.target.setCustomValidity('');
                  }}}/>
              </label>
            </div>
            <div className='adress-field'>
              <h3 className='ml-2.5'>Address fields:</h3>
              <div>
                <label>Street:
                  <input className={style.input} type="text" name="street" pattern='^[a-zA-Zа-яА-Я].*' value={street} onChange={(event) => setStreet(event.target.value.trim())}/>
                </label>
              </div>
              <div>
                <label>City:
                  <input className={style.input} type="text" name="city" pattern='^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$' value={city} onChange={(event) => setCity(event.target.value.trim())}/>
                </label>
              </div>
              <div>
                <label>Postal code:
                  <input className={style.input} type="text" name="postalcode" value={postalcode} onChange={(event) => setPostalcode(event.target.value.trim())}/>
                </label>
              </div>
              <div>
                <label>Country:
                  <input className={style.input} type="text" name="country" value={country} onChange={(event) => setCountry(event.target.value.trim())}/>
                </label>
              </div>
            </div>
          </div>
          <button className={style.sentFormBtn}>Register</button>
        </form>
      </div>
    </>
  )
}
