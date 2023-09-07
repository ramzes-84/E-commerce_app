import { ReactNode, useState } from 'react';
import { FaLock, FaPencilAlt } from 'react-icons/fa';

interface WrapperProps {
  children: ReactNode;
  title: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function Wrapper({ children, title, handleSubmit }: WrapperProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      setIsSaving(true);
      setIsEditing(false);
    } else {
      setIsSaving(false);
      await handleSubmit(event);
      setIsEditing(true);
    }
  };

  return (
    <>
      <form data-testid='wrapper-form' className='relative' onSubmit={handleFormSubmit}>
        <fieldset disabled={isEditing}>
          <legend className='text-lg py-1 font-bold text-emerald-800 m-1.5'>{title}</legend>
          {children}
        </fieldset>
        <button
          className='absolute top-10 right-2 p-1.5 rounded-[50%] transition-property: all duration-300 group/item hover:bg-[#e5ea5976]'
          type="submit"
        >
          {isSaving ? (
            <FaLock style={{ color: '#276339' }} title="Save" />
          ) : isEditing ? (
            <FaPencilAlt style={{ color: '#276339' }} title="Edit" />
          ) : (
            <FaLock style={{ color: '#276339' }} title="Save" />
          )}
        </button>
      </form>
    </>
  );
}
