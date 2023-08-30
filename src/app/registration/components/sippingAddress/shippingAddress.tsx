import { useState } from 'react';
import CheckboxAddress from '../../elements/checkbox/checkbox';
import CityValid from '../city/cityValid';
import PostalCode from '../postalCode/postalCode';
import SelectCountry from '../selectCountry/selectCountry';
import StreetValid from '../streetValid/streetValid';
import Label from '../../elements/wrapper';
import { IMyAddress } from '@/service/api/CustomerService';

interface IShippingAddressProps {
  formShippingAddress: IMyAddress;
  setFormShippingAddress: React.Dispatch<React.SetStateAction<IMyAddress>>;
}

export default function ShippingAddress({ formShippingAddress, setFormShippingAddress }: IShippingAddressProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setFormShippingAddress((prev) => ({ ...prev, defaultShippingAddress: checked }));
  };

  return (
    <div className="adress-field">
      <h3 className="ml-2.5 text-lg">Shipping address:</h3>
      <div>
        <Label label="Street">
          <StreetValid streetName={formShippingAddress.streetName} setFormData={setFormShippingAddress} />
        </Label>
      </div>
      <div>
        <Label label="City">
          <CityValid city={formShippingAddress.city} setFormData={setFormShippingAddress} />
        </Label>
      </div>
      <div>
        <Label label="Country">
          <SelectCountry country={formShippingAddress.country} setFormData={setFormShippingAddress} />
        </Label>
      </div>
      <div>
        <Label label="Postal code">
          <PostalCode
            country={formShippingAddress.country}
            postalCode={formShippingAddress.postalCode}
            setFormData={setFormShippingAddress}
          />
        </Label>
      </div>
      <CheckboxAddress label="Set as default address" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
}
