import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AboutPage } from '@/pages/About';
import styles from './App.module.scss';

const App = () => {
	return (
		<div className={styles.container}>
			<h1>ABOUT MICROFRONTEND APP</h1>
			<Routes>
				<Route
					index
					element={
						<Suspense fallback={<i>About Page is loading...</i>}>
							<AboutPage />
						</Suspense>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
