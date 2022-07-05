import Router from "next/router"
import { useEffect } from "react"

import LoadingPage from "@/components/loading-page.component"
import useAuthentication from "@/features/authentication/authentication.hook"

function HomePage() {
	const { accessStatus } = useAuthentication()

	function onAccessStatusChanged() {
		if (!accessStatus?.granted || !accessStatus.user) {
			return
		}

		Router.push("/party").catch()
	}

	useEffect(onAccessStatusChanged, [accessStatus])

	return <LoadingPage />
}

export default HomePage
