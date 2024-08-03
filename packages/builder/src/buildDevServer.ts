import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { BuildOptions } from './types/build.types';

export function buildDevServer(options: BuildOptions) {
	return {
		port: options.port ?? 3000,
		open: options.open ?? true,
		historyApiFallback: true,
		hot: true,
		compress: true,
	};
}
