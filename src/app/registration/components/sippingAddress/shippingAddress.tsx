import { useState } from "react";
import { IAddress } from "../../page";
import CheckboxAddress from "../checkbox/checkbox";
import CityValid from "../city/cityValid";
import PostalCode from "../postalCode/postalCode";
import SelectCountry from "../selectCountry/selectCountry";
import StreetValid from "../streetValid/streetValid";

interface IShippingAddressProps {
  formShippingAddress: IAddress;
  setFormShippingAddress: React.Dispatch<React.SetStateAction<IAddress>>;
}

export default function ShippingAddress({formShippingAddress, setFormShippingAddress}: IShippingAddressProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    const checked = event.target.checked;
    setFormShippingAddress((prev) => ({ ...prev, defaultShippingAddress: checked }));
  }

  return (
    <div className="adress-field">
      <h3 className="ml-2.5 text-lg">Shipping address:</h3>
      <div>
        <StreetValid streetName={formShippingAddress.streetName} setFormData={setFormShippingAddress} />
      </div>
      <div>
        <CityValid city={formShippingAddress.city} setFormData={setFormShippingAddress} />
      </div>
      <div>
        <SelectCountry country={formShippingAddress.country} setFormData={setFormShippingAddress} />
      </div>
      <div>
        <PostalCode country={formShippingAddress.country} postalCode={formShippingAddress.postalCode} setFormData={setFormShippingAddress} />
      </div>
      <CheckboxAddress label='Set as default address' checked={isChecked} onChange={handleCheckboxChange}/>
    </div>
  )
}