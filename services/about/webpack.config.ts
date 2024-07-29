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
		port: env.port ?? 3002,
		analyzer: env.analyzer ?? false,
		platform: env.platform ?? 'desktop',
		open: ['/about']
	});

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'AboutApp',
			filename: 'remoteEntry.js',
			exposes: {
				'./AboutApp': './src/app/index.ts'
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
