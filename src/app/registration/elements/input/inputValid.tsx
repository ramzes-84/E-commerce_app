import { IAddress, IFormData } from '../../page';
import { showErrorMessage } from '../../utills/showErrorMessage';

interface InputValidProps {
  name: string;
  value: string;
  pattern: string;
  className: string;
  min?: string;
  max?: string;
  type?: string;
  minLength?: number;
  textMistake?: string;
  setFormData?: React.Dispatch<React.SetStateAction<IFormData>>;
  setFormAddressData?: React.Dispatch<React.SetStateAction<IAddress>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputValid({
  name,
  value,
  className,
  pattern,
  max,
  min,
  type,
  minLength,
  textMistake,
  setFormData,
  setFormAddressData,
  setError,
}: InputValidProps) {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueTarget = event.target.value;
    if (setFormData) {
      setFormData(
        (prevState): IFormData => ({
          ...prevState,
          [name]: valueTarget,
        })
      );
    }
    if (setFormAddressData) {
      setFormAddressData(
        (prevState): IAddress => ({
          ...prevState,
          [name]: valueTarget,
        })
      );
    }
    if (textMistake && setError) showErrorMessage(valueTarget, pattern, textMistake, setError);
  };
  return (
    <>
      <input
        type={type}
        minLength={minLength}
        name={name}
        pattern={pattern}
        value={value}
        max={max}
        min={min}
        onChange={handleChangeInput}
        className={className}
      />
    </>
  );
}
