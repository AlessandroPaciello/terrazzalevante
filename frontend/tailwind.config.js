/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ], 
	theme: { 
		extend: {
			colors: {
				'primary': '#FFFFEC',
				'secondary': '#F1E4C3',
				'tertiary': '#597E52',
			},
			backgroundColor: {
				'primary': '#FFFFEC',
				'secondary': '#F1E4C3',
				'tertiary': '#597E52',	
			}
		}, 
	}, 
	plugins: [], 
}