import React, { Suspense, useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import { ShopPage } from '@/pages/Shop';

const App = () => {
	return (
		<div className={styles.container}>
			<h1>SHOP MICROFRONTEND APP</h1>
			<Routes>
				<Route
					index
					element={
						<Suspense fallback={<i>About Page is loading...</i>}>
							<ShopPage />
						</Suspense>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
