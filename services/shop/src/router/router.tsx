import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/components/App';
import { ShopPage } from '@/pages/Shop';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/shop',
				element: (
					<Suspense fallback={<i>Loading...</i>}>
						<ShopPage />
					</Suspense>
				)
			}
		]
	}
];

export const router = createBrowserRouter(routes);
export default routes;
