import BaseLayout from "@/layouts/base/base.layout"

function LoadingPage() {
	return (
		<BaseLayout className="loading-page" theme="synthwave">
			<div className="content">
				<img
					className="animation"
					src="/assets/images/loading-animation.png"
					alt="Lagi nyiapin kue..."
				/>

				<span>Tunggu bentar, lagi nyiapin kue...</span>
			</div>
		</BaseLayout>
	)
}

export default LoadingPage
