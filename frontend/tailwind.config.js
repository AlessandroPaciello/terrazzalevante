const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
const tailwindConfig = module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}"], 
	theme: { 
		extend: {
			colors: {
				'primary': '#E8D8C4',
				'secondary': '#C7B7A3',
				'tertiary': '#6D2932',
				'quaternary': '#561C24',
				'active': '#C6A969',
				'almond': {
					'50': '#faf6f2',
					'100': '#f3ebe1',
					'200': '#e8d8c4',
					'300': '#d7ba9a',
					'400': '#c69971',
					'500': '#bb8054',
					'600': '#ad6d49',
					'700': '#90583e',
					'800': '#754837',
					'900': '#5f3c2f',
					'950': '#321e18',
				},
				
			},
		}, 
	}, 
	plugins: [
		require('tailwind-scrollbar')
	], 
}

const configMT = withMT(tailwindConfig)

export default configMT