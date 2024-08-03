import path from 'path';
import webpack from 'webpack';

import { buildWebpack } from '@packages/builder';
import type { BuildMode, BuildPaths, BuildPlatform } from '@packages/builder';

import packageJson from './package.json';

interface EnvVariablesType {
	mode?: BuildMode;
	port?: number;
	analyzer?: boolean;
	platform?: BuildPlatform;
	SHOP_REMOTE_URL?: string;
	ABOUT_REMOTE_URL?: string;
}

export default async (env: EnvVariablesType) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	};

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		paths,
		port: env.port ?? 3000,
		analyzer: env.analyzer ?? false,
		platform: env.platform ?? 'desktop',
		open: ['/'],
	});

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001';
	const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? 'http://localhost:3002';

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'HostApp',
			filename: 'remoteEntry.js',
			remotes: {
				aboutService: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`,
				shopService: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
			},
			shared: {
				...packageJson.dependencies,
				react: {
					eager: true,
				},
				'react-router-dom': {
					eager: true,
				},
				'react-dom': {
					eager: true,
				},
			},
		}),
	);

	return config;
};
