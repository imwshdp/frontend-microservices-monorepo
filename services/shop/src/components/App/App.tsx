import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './App.module.scss';

const App = () => {
	return (
		<div className={styles.container}>
			<h1>SHOP MICROFRONTEND</h1>
			<Outlet />
		</div>
	);
};

export default App;
