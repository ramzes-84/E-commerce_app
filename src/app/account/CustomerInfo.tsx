'use client';

import Wrapper from './components/wrapper/wrapper';
import FirstNameValid from '../registration/components/firstName/firstNameValid';
import { useEffect, useState } from 'react';
import { logout, removeSetAddress, updateAddressField, updateEmail, updateUserField } from './account-actions';
import {
  ChangeAction,
  ChangeAddresAction,
  ChangeEmail,
  IMyAddress,
  IMyCustomer,
  UpdateAction,
} from '@/service/api/CustomerService';
import LastNameValid from '../registration/components/lastName/lastNameValid';
import DataOfBirthValid from '../registration/components/dataOfBirth/dataOfBirthValid';
import Border from './components/border/border';
import SuccessPopup from './components/popup/successPopup';
import EmailValid from '../registration/components/email/emailValid';
import PasswordChange from './components/passwordChange/passwordChange';
import { useRouter } from 'next/navigation';
import AddAddress from './components/addAddress/addAddress';
import AddressSectionAccount from './components/addresses/addressSectionAccount';

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

  let shippingAddressObjects = customer.addresses.filter((address) => {
    return customer.shippingAddressIds?.includes(address.id);
  });

  const initialFormShippingAddress = shippingAddressObjects.map((address) => ({
    id: address.id,
    streetName: address.streetName,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country,
    defaultShippingAddress: false,
  }));

  const [formShippingAddress, setFormShippingAddress] = useState<IMyAddress[]>(initialFormShippingAddress);

  let billingAddressObjects = customer.addresses.filter((address) => {
    return customer.billingAddressIds?.includes(address.id);
  });

  const initialFormBillingAddress = billingAddressObjects.map((address) => ({
    id: address.id,
    streetName: address.streetName,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country,
    defaultShippingAddress: false,
  }));

  const [formBillingAddress, setFormBillingAddress] = useState<IMyAddress[]>(initialFormBillingAddress);

  const [defaultShipping, setDefaultShipping] = useState(false);

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

  const handleSubmitChangeAddress = (action: ChangeAddresAction, actionRemove: ChangeAction, address: IMyAddress) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const addCustomer = await updateAddressField(customer, action, address);
        if (defaultShipping && addCustomer) {
          const newCustomer = await removeSetAddress(
            addCustomer,
            actionRemove,
            addCustomer.addresses[addCustomer.addresses.length - 1]
          );
          processResult('Address is update!', newCustomer, true, undefined);
        }
        processResult('Address is update!', addCustomer, true, undefined);
      } catch {
        processResult('Oops... Try again, please!', undefined, undefined, true);
      }
    };
  };

  const deleteAddress = (action: ChangeAction, address: IMyAddress) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        const newCustomer = await removeSetAddress(customer, action, address);
        processResult('Address removed!', newCustomer, true, undefined);
      } catch {
        processResult('Oops... Try again, please!', undefined, undefined, true);
      }
    };
  };

  const handleSubmitAddAddress = (
    actionUpdate: ChangeAddresAction,
    actionRemove: ChangeAction,
    address: IMyAddress
  ) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const addCustomer = await updateAddressField(customer, actionUpdate, address);
        if (addCustomer) {
          const newCustomer = await removeSetAddress(
            addCustomer,
            actionRemove,
            addCustomer.addresses[addCustomer.addresses.length - 1]
          );
          processResult('Field is update!', newCustomer, true, undefined);
        }
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
              <div className="flex flex-wrap gap-1 justify-start items-center">
                <AddAddress
                  addressType="Shipping"
                  handleSubmitAddAddress={handleSubmitAddAddress}
                  onUpdate={(address: IMyAddress) => {
                    const newAddressState = [...formShippingAddress, address];
                    setFormShippingAddress(newAddressState);
                  }}
                />
                {shippingAddressObjects.length !== 0 ? (
                  shippingAddressObjects.map((address) => (
                    <AddressSectionAccount
                      key={address.id}
                      customer={customer}
                      formShippingAddress={address}
                      addressType="Shipping"
                      handleSubmitChangeAddress={handleSubmitChangeAddress}
                      deleteAddress={deleteAddress}
                      onUpdate={(addresses: IMyAddress) => {
                        const newAddressState = [...formShippingAddress, addresses];
                        setFormShippingAddress(newAddressState);
                        setCustomer(customer);
                      }}
                    />
                  ))
                ) : (
                  <p className=" text-xl text-emerald-900">No matching results</p>
                )}
              </div>
            </Border>

            <Border title="Billing address">
              <div className="flex flex-wrap gap-1 justify-start items-center">
                <AddAddress
                  addressType="Billing"
                  handleSubmitAddAddress={handleSubmitAddAddress}
                  onUpdate={(address: IMyAddress) => {
                    const newAddressState = [...formBillingAddress, address];
                    setFormBillingAddress(newAddressState);
                  }}
                />
                {billingAddressObjects.length !== 0 ? (
                  billingAddressObjects.map((address) => (
                    <AddressSectionAccount
                      key={address.id}
                      customer={customer}
                      formShippingAddress={address}
                      addressType="Billing"
                      handleSubmitChangeAddress={handleSubmitChangeAddress}
                      deleteAddress={deleteAddress}
                      onUpdate={(addresses: IMyAddress) => {
                        const newAddressState = [...formBillingAddress, addresses];
                        setFormBillingAddress(newAddressState);
                        setCustomer(customer);
                      }}
                    />
                  ))
                ) : (
                  <p className=" text-xl text-emerald-900">No matching results</p>
                )}
              </div>
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
