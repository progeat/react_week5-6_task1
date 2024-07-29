import { useState } from 'react';

const getTime = () => {
	const now = new Date();
	const formateDate = (date) => {
		return String(date).length === 2 ? date : `0${date}`;
	};

	return `${formateDate(now.getHours())}:${formateDate(now.getMinutes())}:${formateDate(now.getSeconds())}`;
};

export const TimeComponent = () => {
	const [nowTime, setNowTime] = useState(getTime);

	const timeInterval = setInterval(() => {
		clearInterval(timeInterval);
		setNowTime(getTime);
	}, 1000);

	return (
		<>
			<div>{new Date().getFullYear()}</div>
			<span>{nowTime}</span>
		</>
	);
};
