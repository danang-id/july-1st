import "@/styles/globals.css"
import "@/styles/layouts/base.layout.css"
import "@/styles/components/error-page.component.css"
import "@/styles/components/loading-page.component.css"
import "@/styles/components/party/balloon.component.css"
import "@/styles/components/party/bulbs.component.css"
import "@/styles/components/party/button.component.css"
import "@/styles/pages/meet-the-guard.page.css"
import "@/styles/pages/party.page.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import AuthenticationProvider from "@/features/authentication/authentication.provider"

function Application({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<AuthenticationProvider>
				<Component {...pageProps} />
			</AuthenticationProvider>
		</>
	)
}

export default Application
