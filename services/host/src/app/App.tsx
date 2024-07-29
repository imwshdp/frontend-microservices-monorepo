import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';

// @ts-ignore
const RemoteAboutApp = lazy(() => import('remoteAboutApp/app'));

const App = () => {
	return (
		<div className={styles.container}>
			<h1>HOST APPLICATION</h1>
			<nav>
				<Link to='/about'>About</Link>
			</nav>

			<Suspense>
				<Routes>
					<Route path='/about/*' element={<RemoteAboutApp />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
