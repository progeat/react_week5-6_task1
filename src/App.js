import { useState, useRef } from 'react';
import { sendFormData } from './utils';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from './constants';
import styles from './app.module.css';

export const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [messageError, setMessageError] = useState(null);
  const buttonSubmit = useRef(null);
  // const isValidFields = useRef(false);

  const checkValidFields = (email, password, repeatPassword) => {
    let messageError = '';
    let isFieldsBlank =
      email === '' || password === '' || repeatPassword === '';

    if (email !== '' && !EMAIL_REGEXP.test(email)) {
      messageError +=
        'Неверно указана почта. Почта должна содержать имя пользователя, знак "@", имя хоста, разделитель "." и название домена. Пример "username@hostname.com"';
    }

    if (password !== '' && !PASSWORD_REGEXP.test(password)) {
      messageError +=
        'Неверно указан пароль. Пароль должен содержать латинские буквы вверхнем и нижнем регистре, цифры, спецсимволы "`~@!#$%&?", а так же длина должна составлять от 8 до 20 символов';
    }

    if (repeatPassword !== '' && repeatPassword !== password) {
      messageError += 'Введенный повтор пароля не совпадает с заданным';
    }

    console.log('сообщение', !!messageError);
    console.log('пусто', !!isFieldsBlank);

    return {
      messageError,
      isValidFields: !messageError && !isFieldsBlank,
    };
  };

  const { messageError, isValidFields } = checkValidFields(
    email,
    password,
    repeatPassword
  );

  if (isValidFields) buttonSubmit.current.focus();

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const onEmailBlur = ({ target }) => {
    if (target.value === '') return;
    let newError = null;

    if (!EMAIL_REGEXP.test(target.value)) {
      newError =
        'Неверно указана почта. Почта должна содержать имя пользователя, знак "@", имя хоста, разделитель "." и название домена. Пример "username@hostname.com"';
    }

    // setMessageError(newError);
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);

    let newError = null;

    if (target.value.length > 20) {
      newError = 'Неверно задан пароль. Должно быть не больше 20 символов';
    }

    // setMessageError(newError);
  };

  const onPasswordBlur = ({ target }) => {
    if (target.value === '') return;
    // setPassword(target.value);

    let newError = null;

    if (!PASSWORD_REGEXP.test(target.value)) {
      newError =
        'Неверно указан пароль. Пароль должен содержать латинские буквы вверхнем и нижнем регистре, цифры, спецсимволы "`~@!#$%&?", а так же длина должна составлять от 8 до 20 символов';
    }

    // setMessageError(newError);
  };

  const onRepeatPasswordChange = ({ target }) => {
    if (target.value === password) {
      buttonSubmit.current.focus();
    }

    setRepeatPassword(target.value);
  };

  const onRepeatPasswordBlur = ({ target }) => {
    if (target.value === '') return;
    if (target.value !== password) console.log('repeatPassword');
    // setMessageError('Введенный повтор пароля не совпадает с заданным');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({ email, password });
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
          onBlur={onEmailBlur}
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        <input
          name="repeat-password"
          type="password"
          value={repeatPassword}
          placeholder="Повтор пароля"
          onChange={onRepeatPasswordChange}
          onBlur={onRepeatPasswordBlur}
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
