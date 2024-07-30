import { useState, useRef, useEffect } from "react";
import { useStore } from "./hooks";
import { sendFormData } from "./utils";
import { EMAIL_REGEXP, PASSWORD_REGEXP } from "./constants";
import styles from "./app.module.css";

export const App = () => {
	const [messageError, setMessageError] = useState("");
	const [isValidFields, setIsValidFields] = useState(false);
	const buttonSubmit = useRef(null);

	const { getState, updateState, resetState } = useStore();
	const { email, password, repeatPassword } = getState();

	const onChange = ({ target }) => {
		setMessageError("");
		setIsValidFields(false);
		if (target.name === "repeatPassword" && target.value === password)
			checkValidFields(target);

		updateState(target.name, target.value);
	};

	const checkValidFields = (target) => {
		let newError = [];
		const isFieldsBlank =
			email === "" || password === "" || repeatPassword === "";

		if (email !== "" && !EMAIL_REGEXP.test(email)) {
			newError.push(
				'Неверно указана почта. Почта должна содержать имя пользователя, знак "@", имя хоста, разделитель "." и название домена. Пример "username@hostname.com".',
			);
		}

		if (
			(password !== "" && !PASSWORD_REGEXP.test(password)) ||
			password.length > 20
		) {
			newError.push(
				'Неверно указан пароль. Пароль должен содержать латинские буквы вверхнем и нижнем регистре, цифры, спецсимволы "`~@!#$%&?", а так же длина должна составлять от 8 до 20 символов.',
			);
		}

		if (
			repeatPassword !== "" &&
			target.name === "repeatPassword" &&
			target.value !== password
		) {
			newError.push("Подтверждение пароля не совпадает с заданным.");
		} else if (
			target.name !== "repeatPassword" &&
			repeatPassword !== "" &&
			repeatPassword !== password
		) {
			newError.push("Подтверждение пароля не совпадает с заданным.");
		}
		setMessageError(newError.join("\n"));
		setIsValidFields(!newError[0] && !isFieldsBlank);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, repeatPassword });
		resetState();
	};

	useEffect(() => {
		if (isValidFields) {
			buttonSubmit.current.focus();
		}
	}, [isValidFields]);

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h1 className={styles.label}>
					Регистрация нового пользователя
				</h1>
				<input
					name="email"
					type="email"
					value={email}
					placeholder="Почта"
					onChange={onChange}
					onBlur={checkValidFields}
				/>
				<input
					name="password"
					type="password"
					value={password}
					placeholder="Пароль"
					onChange={onChange}
					onBlur={checkValidFields}
				/>
				<input
					name="repeatPassword"
					type="password"
					value={repeatPassword}
					placeholder="Подтверждение пароля"
					onChange={onChange}
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
			</form>
			{messageError && <div className={styles.error}>{messageError}</div>}
		</div>
	);
};
