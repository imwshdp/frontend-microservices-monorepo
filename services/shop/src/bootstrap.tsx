import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '@packages/shared/src/routes';

import { App } from './app';

const root = document.getElementById('root');
if (!root) {
	throw Error('App Mounting Error');
}

const container = createRoot(root);

container.render(
	<StrictMode>
		<BrowserRouter basename={ROUTES.shop}>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
