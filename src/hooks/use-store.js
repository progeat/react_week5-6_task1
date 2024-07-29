import { useState } from 'react';

const initialState = {
  email: '',
  password: '',
  repeatPassword: '',
  messageError: '',
  isValid: false,
};

export const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
  };
};
