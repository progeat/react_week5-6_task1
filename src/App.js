import { useState, useRef, useEffect } from 'react';
import { sendFormData } from './utils';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from './constants';
import styles from './app.module.css';

export const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isValidFields, setIsValidFields] = useState(false);
  const buttonSubmit = useRef(null);

  useEffect(() => {
    if (isValidFields) {
      buttonSubmit.current.focus();
    }
  }, [isValidFields]);

  const checkValidFields = ({ target }) => {
    let newError = [];
    const isFieldsBlank =
      email === '' || password === '' || repeatPassword === '';

    if (email !== '' && !EMAIL_REGEXP.test(email)) {
      newError.push(
        'Неверно указана почта. Почта должна содержать имя пользователя, знак "@", имя хоста, разделитель "." и название домена. Пример "username@hostname.com".'
      );
    }

    if (
      (password !== '' && !PASSWORD_REGEXP.test(password)) ||
      password.length > 20
    ) {
      newError.push(
        'Неверно указан пароль. Пароль должен содержать латинские буквы вверхнем и нижнем регистре, цифры, спецсимволы "`~@!#$%&?", а так же длина должна составлять от 8 до 20 символов.'
      );
    }

    if (
      repeatPassword !== '' &&
      target.name === 'repeat-password' &&
      target.value !== password
    ) {
      newError.push('Подтверждение пароля не совпадает с заданным.');
    }

    setMessageError(newError.join('\n'));
    setIsValidFields(!newError[0] && !isFieldsBlank);
  };

  const onEmailChange = ({ target }) => {
    setMessageError('');
    setIsValidFields(false);
    setEmail(target.value);
  };

  const onPasswordChange = ({ target }) => {
    setMessageError('');
    setIsValidFields(false);
    setPassword(target.value);
  };

  const onRepeatPasswordChange = (event) => {
    setMessageError('');
    setIsValidFields(false);

    if (event.target.value === password) {
      console.log('ok');
      checkValidFields(event);
    }

    setRepeatPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({ email, password, repeatPassword });
  };

  return (
    <div className={styles.app}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Почта"
          onChange={onEmailChange}
          onBlur={checkValidFields}
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={onPasswordChange}
          onBlur={checkValidFields}
        />
        <input
          name="repeat-password"
          type="password"
          value={repeatPassword}
          placeholder="Подтверждение пароля"
          onChange={onRepeatPasswordChange}
          onBlur={checkValidFields}
        />
        <button
          ref={buttonSubmit}
          className={styles.button}
          type="submit"
          disabled={!isValidFields}
        >
          Зарегистрироваться
        </button>
        {messageError && <div className={styles.error}>{messageError}</div>}
      </form>
    </div>
  );
};
