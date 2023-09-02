interface SuccessPopupProps {
  message: string;
  successChange: boolean;
  errorChange: boolean;
}

export default function SuccessPopup({ message, successChange, errorChange }: SuccessPopupProps) {
  return (
    <>
      {successChange && (
        <div
          className="fixed right-0 bottom-7 mb-4 mr-4 bg-green-500/60 text-white px-4 py-2 rounded-md shadow-md z-10"
          data-testid="success-popup"
        >
          <p>{message}</p>
        </div>
      )}
      {errorChange && (
        <div className="fixed w-1/4 right-0 bottom-7 mb-4 mr-4 bg-red-500/60 text-white px-4 py-2 rounded-md shadow-md z-10">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}