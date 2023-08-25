import { useState } from 'react';
import { IAddress } from '../../page';
import CheckboxAddress from '../../elements/checkbox/checkbox';
import CityValid from '../city/cityValid';
import PostalCode from '../postalCode/postalCode';
import SelectCountry from '../selectCountry/selectCountry';
import StreetValid from '../streetValid/streetValid';

interface IBillingAddressProps {
  formBillingAddress: IAddress;
  setFormBillingAddress: React.Dispatch<React.SetStateAction<IAddress>>;
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
        <StreetValid streetName={formBillingAddress.streetName} setFormData={setFormBillingAddress} />
      </div>
      <div>
        <CityValid city={formBillingAddress.city} setFormData={setFormBillingAddress} />
      </div>
      <div>
        <SelectCountry country={formBillingAddress.country} setFormData={setFormBillingAddress} />
      </div>
      <div>
        <PostalCode
          country={formBillingAddress.country}
          postalCode={formBillingAddress.postalCode}
          setFormData={setFormBillingAddress}
        />
      </div>
      <CheckboxAddress label="Set as default address" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
}
