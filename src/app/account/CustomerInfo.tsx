'use client';

import Wrapper from './components/wrapper/wrapper';
import FirstNameValid from '../registration/components/firstName/firstNameValid';
import { useEffect, useState } from 'react';
import { logout, updateAddressField, updateEmail, updateUserField } from './account-actions';
import { ChangeAddresAction, ChangeEmail, IMyAddress, IMyCustomer, UpdateAction } from '@/service/api/CustomerService';
import LastNameValid from '../registration/components/lastName/lastNameValid';
import DataOfBirthValid from '../registration/components/dataOfBirth/dataOfBirthValid';
import Border from './components/border/border';
import StreetValid from '../registration/components/streetValid/streetValid';
import CityValid from '../registration/components/city/cityValid';
import SelectCountry from '../registration/components/selectCountry/selectCountry';
import PostalCode from '../registration/components/postalCode/postalCode';
import SuccessPopup from './components/popup/successPopup';
import EmailValid from '../registration/components/email/emailValid';
import PasswordChange from './components/passwordChange/passwordChange';
import { useRouter } from 'next/navigation';

interface CustomerInfoProps {
  customer: IMyCustomer;
}

export function CustomerInfo({ customer: currentCustomer }: CustomerInfoProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState(currentCustomer);

  const [email, setEmail] = useState(customer.email);
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(customer.dateOfBirth);

  const [formShippingAddress, setFormShippingAddress] = useState<IMyAddress>({
    id: customer.addresses[0].id,
    key: customer.addresses[0].key,
    streetName: customer.addresses[0].streetName,
    city: customer.addresses[0].city,
    postalCode: customer.addresses[0].postalCode,
    country: customer.addresses[0].country,
    defaultShippingAddress: false,
  });

  const [formBillingAddress, setFormBillingAddress] = useState<IMyAddress>({
    id: customer.addresses[1].id,
    key: customer.addresses[1].key,
    streetName: customer.addresses[1].streetName,
    city: customer.addresses[1].city,
    postalCode: customer.addresses[1].postalCode,
    country: customer.addresses[1].country,
    defaultShippingAddress: false,
  });

  const processResult = (message: string, newCustomer?: IMyCustomer, isSuccess?: boolean, isError?: boolean) => {
    isSuccess ? setSuccessChange(isSuccess) : isError ? setErrorChange(isError) : null;
    setChageMessage(message);
    setTimeout(() => {
      isSuccess ? setSuccessChange(!isSuccess) : isError ? setErrorChange(!isError) : null;
    }, 3000);
    if (newCustomer) setCustomer(newCustomer);
  };

  const [savePassword, setSavePassword] = useState(false);

  useEffect(() => {
    if (savePassword) {
      logout();
      router.refresh();
      router.push('./login');
      processResult('Update! Please, login with new password', undefined, true, undefined);
    }
  }, [savePassword, router]);

  const [chageMessage, setChageMessage] = useState('');
  const [successChange, setSuccessChange] = useState(false);
  const [errorChange, setErrorChange] = useState(false);

  const handleFormSubmit = (fieldname: string, action: UpdateAction, value?: string) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const newCustomer = await updateUserField(customer, fieldname, action, value);
        processResult('Field is update!', newCustomer, true, undefined);
      } catch {
        processResult('Oops... Try again, please!', undefined, undefined, true);
      }
    };
  };

  const handleSubmitChangeAddress = (action: ChangeAddresAction, address: IMyAddress) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const newCustomer = await updateAddressField(customer, action, address);
        processResult('Field is update!', newCustomer, true, undefined);
      } catch {
        processResult('Oops... Try again, please!', undefined, undefined, true);
      }
    };
  };

  const handleSubmitChangeEmail = (action: ChangeEmail, value: string) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const newCustomer = await updateEmail(customer, action, value);
        processResult('Field is update!', newCustomer, true, undefined);
      } catch {
        processResult('Oops... Try again, please!', undefined, undefined, true);
      }
    };
  };

  return (
    <>
      {customer ? (
        <div className=" font-serif flex w-full flex-col items-center my-6">
          <div className="xl:w-3/6 lg:w-4/6 md:w-4/5 sm:w-4/5">
            <SuccessPopup message={chageMessage} successChange={successChange} errorChange={errorChange} />
            <Border title="Personal information">
              <Wrapper title="Name:" handleSubmit={handleFormSubmit('firstName', 'setFirstName', firstName)}>
                <FirstNameValid firstName={firstName} setFirstName={setFirstName} />
              </Wrapper>
              <Wrapper title="Lastname:" handleSubmit={handleFormSubmit('lastName', 'setLastName', lastName)}>
                <LastNameValid lastName={lastName} setLastName={setLastName} />
              </Wrapper>
              <Wrapper title="Birthday:" handleSubmit={handleFormSubmit('dateOfBirth', 'setDateOfBirth', dateOfBirth)}>
                <DataOfBirthValid dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
              </Wrapper>
            </Border>

            <Border title="Shipping address">
              <Wrapper title="Street:" handleSubmit={handleSubmitChangeAddress('changeAddress', formShippingAddress)}>
                <StreetValid streetName={formShippingAddress.streetName} setFormData={setFormShippingAddress} />
              </Wrapper>
              <Wrapper title="City:" handleSubmit={handleSubmitChangeAddress('changeAddress', formShippingAddress)}>
                <CityValid city={formShippingAddress.city} setFormData={setFormShippingAddress} />
              </Wrapper>
              <Wrapper title="Country:" handleSubmit={handleSubmitChangeAddress('changeAddress', formShippingAddress)}>
                <SelectCountry country={formShippingAddress.country} setFormData={setFormShippingAddress} />
              </Wrapper>
              <Wrapper
                title="Postal code:"
                handleSubmit={handleSubmitChangeAddress('changeAddress', formShippingAddress)}
              >
                <PostalCode
                  country={formShippingAddress.country}
                  postalCode={formShippingAddress.postalCode}
                  setFormData={setFormShippingAddress}
                />
              </Wrapper>
            </Border>

            <Border title="Billing address">
              <Wrapper title="Street:" handleSubmit={handleSubmitChangeAddress('changeAddress', formBillingAddress)}>
                <StreetValid streetName={formBillingAddress.streetName} setFormData={setFormBillingAddress} />
              </Wrapper>
              <Wrapper title="City:" handleSubmit={handleSubmitChangeAddress('changeAddress', formBillingAddress)}>
                <CityValid city={formBillingAddress.city} setFormData={setFormBillingAddress} />
              </Wrapper>
              <Wrapper title="Country:" handleSubmit={handleSubmitChangeAddress('changeAddress', formBillingAddress)}>
                <SelectCountry country={formBillingAddress.country} setFormData={setFormBillingAddress} />
              </Wrapper>
              <Wrapper
                title="Postal code:"
                handleSubmit={handleSubmitChangeAddress('changeAddress', formBillingAddress)}
              >
                <PostalCode
                  country={formBillingAddress.country}
                  postalCode={formBillingAddress.postalCode}
                  setFormData={setFormBillingAddress}
                />
              </Wrapper>
            </Border>

            <Border title="Login & Security">
              <Wrapper title="Email:" handleSubmit={handleSubmitChangeEmail('changeEmail', email)}>
                <EmailValid email={email} setEmail={setEmail} />
              </Wrapper>
              <PasswordChange title="Password:" customer={customer} setSavePassword={setSavePassword} />
            </Border>
          </div>
        </div>
      ) : (
        <p className=" font-serif flex w-full flex-col items-center my-6">
          Loading data fails. Please try again later.
        </p>
      )}
    </>
  );
}
