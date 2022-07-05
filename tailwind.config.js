/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layouts/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				love: "#000032",
			},
			fontFamily: {
				handwriting: ["Mali"],
			},
			keyframes: {
				"balloon-rotate-1": {
					"0%, 100%": {
						transform: "rotate(30deg)",
					},
					"50%": {
						transform: "rotate(-30deg)",
					},
				},
				"balloon-rotate-2": {
					"0%, 100%": {
						transform: "rotate(-20deg)",
					},
					"50%": {
						transform: "rotate(20deg)",
					},
				},
			},
			animation: {
				"balloon-rotate-1": "balloon-rotate-1 10s ease-in-out infinite",
				"balloon-rotate-2": "balloon-rotate-2 10s ease-in-out infinite",
			},
		},
	},
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "ui-",
	},
	plugins: [require("daisyui")],
}
