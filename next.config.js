const pkg = require("./package.json")
const semver = require("semver")
const { Temporal } = require("@js-temporal/polyfill")

const DefaultCookieMaxAge = new Temporal.Duration(0, 0, 0, 1).total("seconds")

/** @type {import("next").NextConfig} */
module.exports = {
	reactStrictMode: true,
	serverRuntimeConfig: {
		authentication: {
			disabled:
				process.env.NODE_ENV === "development" &&
				process.env.CA_AUTHENTICATION_DISABLED === "true",
			useBirthdayValidation:
				process.env.CA_AUTHENTICATION_USE_BIRTHDAY_VALIDATION !== "false",
		},
		birthday: new Temporal.PlainDate(1999, 7, 1),
		name: "Choirul Amanah",
		passcode: process.env.CA_PASSCODE,
		session: {
			cookieName: `${pkg.name}-session`,
			password: process.env.CA_SESSION_PASSWORD,
			cookieOptions: {
				httpOnly: process.env.CA_COOKIE_HTTP_ONLY !== "false",
				maxAge: parseInt(process.env.CA_COOKIE_MAX_AGE) || DefaultCookieMaxAge,
				sameSite: process.env.CA_COOKIE_SAME_SITE || "strict",
				secure:
					process.env.NODE_ENV === "production" ||
					process.env.CA_COOKIE_SECURE === "true",
			},
		},
	},
	publicRuntimeConfig: {
		environment: process.env.NODE_ENV || "production",
		application: {
			name: process.env.NEXT_PUBLIC_APPLICATION_NAME || "The 1st of July",
			shortName: pkg.name || "july-1st",
			description: pkg.description || "The 1st of July Celebration",
		},
		age: new Temporal.Duration(semver.major(pkg.version)),
		title: process.env.NEXT_PUBLIC_TITLE || "The 1st of July",
	},
}
