/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"darkish-blue": "#152236",
				nav: "#29446b",
				"contrast-color": "#42f5c5",
				"contrast-color-dark": "#1e8769",
			},
		},
	},
	plugins: [],
}
