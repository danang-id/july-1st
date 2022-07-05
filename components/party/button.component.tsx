import classNames from "classnames"
import { MouseEventHandler, useEffect, useState } from "react"

import { useTimeoutEffect } from "@/common/timeout"

export interface ButtonProps {
	disableEffect?: boolean
	shown?: boolean
	text: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ disableEffect = false, shown = false, text, onClick }: ButtonProps) {
	const defaultClassName = classNames("ui-btn", "ui-btn-primary", "button")
	const [className, setClassName] = useState<string>(
		classNames(defaultClassName, { hidden: !shown })
	)

	function onShownChanged() {
		if (disableEffect) {
			const newClassName = classNames(defaultClassName, { hidden: !shown })

			setClassName(newClassName)
			return
		}

		const newClassName = classNames(defaultClassName, shown ? "opacity-90" : "opacity-0")

		setClassName(newClassName)
	}

	function afterShownChanged() {
		if (disableEffect) {
			return
		}

		if (shown) {
			return
		}

		const newClassName = classNames(defaultClassName, "hidden")

		setClassName(newClassName)
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onShownChanged, [shown])
	useTimeoutEffect(afterShownChanged, 1000, [shown])

	return (
		<button type="button" className={className} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
