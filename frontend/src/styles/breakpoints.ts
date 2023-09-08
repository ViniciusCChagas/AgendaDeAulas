const size = {
  xs: '400px',
	sm: '800px',
	md: '1030px',
	lg: '1200px',
	xl: '1800px',
};

export const device = (Object.keys(size) as Array<keyof typeof size>).reduce(
	(acc, key) => {
		acc[key] = (style: String) => `@media (max-width: ${size[key]}) { ${style} }`;
		return acc;
	},
	{} as { [index: string]: Function }
);
