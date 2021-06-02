import React from 'react';

import styles from './Notification.module.css';

const Notification = ({ notification }) => {
	const [ message, event ] = notification;
	if (message === null) {
		return null
	}
	if (event) {
		return (
			<div className={`${styles.notification} ${styles.ok}`}>
				{message}
			</div>
		);
	}
	return (
		<div className={`${styles.notification} ${styles.error}`}>
			{message}
		</div>
	);
};

export default Notification;
