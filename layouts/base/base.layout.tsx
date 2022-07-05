import classNames from "classnames"
import Head from "next/head"
import React, { CSSProperties, ReactNode } from "react"

import Config from "@/common/config"

export interface BaseLayoutProps {
	children?: ReactNode
	className?: string
	ignoreTheme?: boolean
	style?: CSSProperties
	theme?: string
	title?: string
}

function BaseLayout({
	children,
	className,
	ignoreTheme = false,
	style,
	theme = "cmyk",
	title,
}: BaseLayoutProps) {
	const layoutClassName = classNames("layout", { "layout-theme": !ignoreTheme })
	const layoutContainerClassName = classNames("layout-container", className)

	return (
		<>
			<Head>
				<title>{title ? `${title} - ${Config.public.title}` : Config.public.title}</title>
				<meta name="description" content={Config.public.application.description} />
			</Head>
			<div className={layoutClassName} data-theme={theme}>
				<div className={layoutContainerClassName} style={style}>
					{children}
				</div>
			</div>
		</>
	)
}

export default BaseLayout
