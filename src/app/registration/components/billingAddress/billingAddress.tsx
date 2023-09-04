import { useState } from 'react';
import CheckboxAddress from '../../elements/checkbox/checkbox';
import CityValid from '../city/cityValid';
import PostalCode from '../postalCode/postalCode';
import SelectCountry from '../selectCountry/selectCountry';
import StreetValid from '../streetValid/streetValid';
import Label from '../../elements/wrapper';
import { IMyAddress } from '@/service/api/CustomerService';

interface IBillingAddressProps {
  formBillingAddress: IMyAddress;
  setFormBillingAddress: React.Dispatch<React.SetStateAction<IMyAddress>>;
}

export default function BillingAddress({ formBillingAddress, setFormBillingAddress }: IBillingAddressProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setFormBillingAddress((prev) => ({ ...prev, defaultBillingAddress: checked }));
  };

  return (
    <div className="adress-field">
      <h3 className="ml-2.5 text-lg">Billing address:</h3>
      <div>
        <Label label="Street">
          <StreetValid streetName={formBillingAddress.streetName} setFormData={setFormBillingAddress} />
        </Label>
      </div>
      <div>
        <Label label="City">
          <CityValid city={formBillingAddress.city} setFormData={setFormBillingAddress} />
        </Label>
      </div>
      <div>
        <Label label="Country">
          <SelectCountry country={formBillingAddress.country} setFormData={setFormBillingAddress} />
        </Label>
      </div>
      <div>
        <Label label="Postal code">
          <PostalCode
            country={formBillingAddress.country}
            postalCode={formBillingAddress.postalCode}
            setFormData={setFormBillingAddress}
          />
        </Label>
      </div>
      <CheckboxAddress label="Set as default address" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
}
