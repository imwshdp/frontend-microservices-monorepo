import { createRoot } from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { App } from './app';

const root = document.getElementById('root');
if (!root) {
	throw Error('App Mounting Error');
}

const container = createRoot(root);

container.render(
	<StrictMode>
		<BrowserRouter basename='/shop'>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
