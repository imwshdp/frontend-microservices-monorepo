import path from 'path';
import webpack from 'webpack';

import { buildWebpack } from '@packages/build-config';
import type { BuildMode, BuildPaths, BuildPlatform } from '@packages/build-config';

import packageJson from './package.json';

interface EnvVariablesType {
	mode?: BuildMode;
	port?: number;
	analyzer?: boolean;
	platform?: BuildPlatform;
	SHOP_REMOTE_URL?: string;
	ABOUT_REMOTE_URL?: string;
}

export default (env: EnvVariablesType) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public')
	};

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		paths,
		port: env.port ?? 3000,
		analyzer: env.analyzer ?? false,
		platform: env.platform ?? 'desktop'
	});

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost/3001';
	const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? 'http://localhost/3002';

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'HostApp',
			filename: 'remoteEntry.js',
			remotes: {
				remoteAboutApp: `AboutApp@${ABOUT_REMOTE_URL}/remoteEntry.js`
			},
			shared: {
				...packageJson.dependencies,
				react: {
					requiredVersion: packageJson.dependencies['react'],
					eager: true,
					singleton: true
				},
				'react-router-dom': {
					requiredVersion: packageJson.dependencies['react-router-dom'],
					eager: true,
					singleton: true
				},
				'react-dom': {
					requiredVersion: packageJson.dependencies['react-dom'],
					eager: true,
					singleton: true
				}
			}
		})
	);

	return config;
};
