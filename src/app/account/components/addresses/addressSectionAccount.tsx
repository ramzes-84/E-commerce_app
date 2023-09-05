import AddressSection from '@/app/registration/components/addresses/addressSection';
import { useState } from 'react';
import BigPopup from '../passwordChange/popup/passwordChangePopup';
import Wrapper from '../wrapper/wrapper';
import { ChangeAction, ChangeAddresAction, IMyAddress, IMyCustomer } from '@/service/api/CustomerService';
import { FaTrash } from 'react-icons/fa';

type IShippingAddressProps = {
  formShippingAddress: IMyAddress;
  customer: IMyCustomer;
  addressType: 'Shipping' | 'Billing';
  handleSubmitChangeAddress: (action: ChangeAddresAction, actionRemove: ChangeAction, address: IMyAddress) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  deleteAddress: (
    action: ChangeAction,
    address: IMyAddress
  ) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onUpdate: (address: IMyAddress) => void;
};

export default function AddressSectionAccount({
  formShippingAddress,
  customer: currentCustomer,
  addressType,
  handleSubmitChangeAddress,
  deleteAddress,
  onUpdate,
}: IShippingAddressProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [defaultShipping, setDefaultShipping] = useState(false);

  const [addresses, setAddresses] = useState<IMyAddress>(formShippingAddress);

  return (
    <>
      <button
        className="w-28	h-28 rounded outline-none shadow-[5px_7px_6px_1px_rgb(211,238,206,0.45)]"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        {`Look your ${addressType} address`}
      </button>
      {isOpen && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <div className="font-serif flex justify-center flex-col items-center w-full">
            <div className="lg:w-3/6 md:w-4/5 sm:w-4/5 min-[320px]:w-4/5">
              <Wrapper
                title={`${addressType} address`}
                handleSubmit={handleSubmitChangeAddress('changeAddress', `setDefault${addressType}Address`, addresses)}
              >
                <AddressSection
                  formShippingAddress={addresses}
                  onUpdate={(address: IMyAddress, isDefault: boolean) => {
                    const newState = { ...address, defaultShippingAddress: isDefault };
                    setAddresses({ ...address, ...newState });
                    onUpdate(newState);
                  }}
                />
              </Wrapper>
              <button
                type="button"
                className="absolute right-[70px]"
                onClick={deleteAddress('removeAddress', addresses)}
              >
                {<FaTrash style={{ color: '#276339' }} title="Delete" />}
              </button>
            </div>
          </div>
        </BigPopup>
      )}
    </>
  );
}
