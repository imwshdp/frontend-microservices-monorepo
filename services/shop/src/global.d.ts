declare module '*.module.css' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.module.scss' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
	import React from 'react';
	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const __PLATFORM__: 'desktop | mobile';
declare const __ENV__: 'development' | 'production';