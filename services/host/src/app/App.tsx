import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@packages/shared/src/routes';

import styles from './App.module.scss';

// @ts-ignore
const AboutMicroservice = lazy(() => import('aboutService/app'));
// @ts-ignore
const ShopMicroservice = lazy(() => import('shopService/app'));

const App = () => {
	return (
		<div className={styles.container}>
			<h1>HOST APPLICATION</h1>
			<nav className={styles.nav}>
				<Link className={styles.link} to={ROUTES.about}>
					About Microservice
				</Link>
				<Link className={styles.link} to={ROUTES.shop}>
					Shop Microservice
				</Link>
				<Link className={styles.link} to={ROUTES.host}>
					Host App
				</Link>
			</nav>

			<section className={styles.remote}>
				<Suspense fallback={<b>Loading Services...</b>}>
					<Routes>
						<Route
							path='/'
							element={
								<p className={styles.description}>
									This is a host app on main port. You can see microservices rendered in this container after clicking
									on links from navigation panel.
								</p>
							}
						/>
						<Route path={`/${ROUTES.about}/*`} element={<AboutMicroservice />} />
						<Route path={`/${ROUTES.shop}/*`} element={<ShopMicroservice />} />
					</Routes>
				</Suspense>
			</section>
		</div>
	);
};

export default App;
