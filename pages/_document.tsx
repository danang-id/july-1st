import { Head, Html, Main, NextScript } from "next/document"

function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />

				<link
					id="head-link-apple-touch-icon"
					rel="apple-touch-icon"
					sizes="180x180"
					href="/assets/apple-touch-icon.png"
				/>
				<link
					id="head-link-icon-32"
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/assets/favicon-32x32.png"
				/>
				<link
					id="head-link-icon-16"
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/assets/favicon-16x16.png"
				/>

				<meta
					id="head-meta-apple-mobile-web-app-title"
					name="apple-mobile-web-app-title"
					content="Choirul Amanah"
				/>
				<meta
					id="head-meta-application-name"
					name="application-name"
					content="Choirul Amanah"
				/>
				<meta
					id="head-meta-msapplication-TileColor"
					name="msapplication-TileColor"
					content="#ffffff"
				/>
				<meta name="theme-color" content="#ffffff" />

				<link
					rel="preconnect"
					crossOrigin="anonymous"
					href="https://fonts.googleapis.com"
				/>
				<link rel="preconnect" crossOrigin="anonymous" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Patrick+Hand&display=swap"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
