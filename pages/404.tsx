import Router from "next/router"

import ErrorPage from "@/components/error-page.component"

function NotFoundPage() {
	function onBackButtonClicked() {
		Router.back()
	}

	return (
		<ErrorPage
			documentTitle="Laman Tidak Ditemukan"
			title="Uups!"
			message="Laman yang kamu tuju tidak ditemukan."
		>
			<button type="button" className="back-button" onClick={onBackButtonClicked}>
				Balik Deh
			</button>
		</ErrorPage>
	)
}

export default NotFoundPage
