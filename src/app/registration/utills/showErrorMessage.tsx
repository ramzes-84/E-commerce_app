type SetError = React.Dispatch<React.SetStateAction<string>>;

export const showErrorMessage = (valueTarget: string, pattern: string, textMistake: string, setError: SetError) => {
  if (!valueTarget) {
    setError('');
    return;
  }
  const regexp = new RegExp(pattern);
  if (!regexp.test(valueTarget)) {
    setError(`${textMistake}`);
    return;
  }
  setError('');
};
