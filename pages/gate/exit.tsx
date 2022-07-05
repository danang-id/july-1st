import { useEffect } from "react"

import LoadingPage from "@/components/loading-page.component"
import useAuthentication from "@/features/authentication/authentication.hook"

function ExitPage() {
	const { clearSession } = useAuthentication()

	function onMount() {
		clearSession().catch()
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onMount, [])

	return <LoadingPage />
}

export default ExitPage
