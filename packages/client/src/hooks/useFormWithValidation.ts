import { useState, useCallback } from 'react';
import { validate } from 'react-email-validator';

type Validators = {
  [key: string]: Record<string, (arg: string) => boolean>
};

const useFormWithValidation = () => {

  const [formValues, setFormValues] = useState({
    userName: '',
    userSurname: '',
    userNickname: '',
    userEmail: '',
    userPhone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userName: {
      required: false,
      format: false,
    },
    userSurname: {
      required: false,
      format: false,
    },
    userNickName: {
      required: false,
      format: false,
    },
    userEmail: {
      required: false,
      isEmail: false,
    },
    userPhone: {
      required: false,
      format: false,
    },
    password: {
      required: false,
      format: false,
    }
  });

  const validators: Validators = {
    userName: {
      required: (value: string): boolean => /\S/i.test(value),
      format: (value: string): boolean => /^[A-ZА-ЯЁ]{1}[a-zа-яё]{2,15}$/.test(value),
    },
    userSurname: {
      required: (value: string): boolean => /\S/i.test(value),
      format: (value: string): boolean => /^[а-яёa-z -]+$/i.test(value),
    },
    userNickName: {
      required: (value: string): boolean => /\S/i.test(value),
      format: (value: string): boolean => /^[а-яёa-z -]+$/i.test(value),
    },
    userEmail: {
      required: (value: string): boolean => /\S/i.test(value),
      isEmail: (value: string): boolean => !validate(value),
    },
    userPhone: {
      required: (value: string): boolean => /\S/i.test(value),
      format: (value: string): boolean => /\+?[\d]{10,15}$/.test(value),
    },
    password: {
      required: (value: string): boolean => /\S/i.test(value),
      format: (value: string): boolean => /^(?=.*?[0-9])(?=.*?[A-Z])[\S]{8,40}$/.test(value),
    }
  };

  const handleInputChange = useCallback((e: Event) => {
    const { value, name } = e.target as HTMLInputElement;
    validateInput(name, value);
    setFormValues((prevState) => ({ ...prevState, [name]:value }));
  }, [setFormValues]);

  const validateInput = (inputName: string, inputValue: string) => {
    const ValidationRes = Object.keys(validators[inputName]).map(
      errorKey => {
        const errorResult = validators[inputName][errorKey](inputValue);
        return { [errorKey]: errorResult };
      }
    ).reduce((acc, el) => ({ ...acc, ...el }), {});

    setErrors((prevState) => ({
      ...prevState,
      [inputName]: ValidationRes,
    }));

  }

  const resetForm = () => {
    setFormValues({
      userName: '',
      userSurname: '',
      userNickname: '',
      userEmail: '',
      userPhone: '',
      password: '',
    });

    setErrors({
      userName: {
        required: false,
        format: false,
      },
      userSurname: {
        required: false,
        format: false,
      },
      userNickName: {
        required: false,
        format: false,
      },
      userEmail: {
        required: false,
        isEmail: false,
      },
      userPhone: {
        required: false,
        format: false,
      },
      password: {
        required: false,
        format: false,
      }
    });
  }

  return [ formValues, setFormValues, errors, handleInputChange, resetForm ];

}

export default useFormWithValidation;