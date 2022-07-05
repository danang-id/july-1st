import Router from "next/router"

import ErrorPage from "@/components/error-page.component"

function FallbackPage() {
	function onBackButtonClicked() {
		Router.back()
	}

	return (
		<ErrorPage
			documentTitle="Terjadi Kesalahan"
			title="Hmm, ada yang salah..."
			message="Seharusnya hal ini tidak terjadi :("
		>
			<button type="button" className="back-button" onClick={onBackButtonClicked}>
				Balik Deh
			</button>
		</ErrorPage>
	)
}

export default FallbackPage
