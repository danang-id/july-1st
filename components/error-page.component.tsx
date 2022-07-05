import { ReactNode } from "react"

import BaseLayout from "@/layouts/base/base.layout"

export interface ErrorPageProps {
	documentTitle: string
	title: string
	message: string
	children?: ReactNode
}

function ErrorPage({ children, documentTitle, title, message }: ErrorPageProps) {
	return (
		<BaseLayout className="error-page" title={documentTitle}>
			<div className="content">
				<p className="title">{title}</p>
				<p className="description">{message}</p>
			</div>

			<div className="click-to-action">{children}</div>
		</BaseLayout>
	)
}

export default ErrorPage
