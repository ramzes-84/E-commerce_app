interface ICheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxAddress({ label, checked, onChange }: ICheckboxInputProps) {
  return (
    <div>
      <label className="flex">
        <input className="mr-2" type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
}
