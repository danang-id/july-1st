import classNames from "classnames"
import { useEffect, useState } from "react"

import { useTimeoutEffect } from "@/common/timeout"

export type BalloonNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

export const AllBalloonNumbers: BalloonNumber[] = [1, 2, 3, 4, 5, 6, 7]

type BalloonPosition = {
	top: number | string
	left: number | string
}

const BalloonCharacters = "Choirul".split("")
const AfterTopPosition = [23, 24, 22, 20, 25, 26, 24]

function getImageByNumber(number: number) {
	return `/assets/images/balloon-${number}.png`
}

export interface BalloonProps {
	fly?: boolean
	number: BalloonNumber
	showCharacter?: boolean
}

function Balloon({ fly = false, number, showCharacter = false }: BalloonProps) {
	const hiddenPosition: BalloonPosition = {
		left: "100px",
		top: "100%",
	}
	const flyPosition: BalloonPosition = {
		left: `calc(${(number / 8) * 100}% - 41px)`,
		top: `calc(100% - ${AfterTopPosition[number - 1]}rem)`,
	}
	const showCharacterPosition: BalloonPosition = {
		left: `calc(${(number / 8) * 100}% - 41px)`,
		top: "",
	}

	const image = getImageByNumber(number)

	const [position, setPosition] = useState<BalloonPosition>(hiddenPosition)
	const [transitionDuration, setTransitionDuration] = useState<string>("8s")

	// function getRandomPosition() {}

	function onFlyChanged() {
		if (showCharacter) {
			return
		}

		setTimeout(() => {
			setPosition(fly ? flyPosition : hiddenPosition)
			setTransitionDuration(fly ? "12s" : "8s")
		}, 0)
	}

	function onShowCharacterChanged() {
		if (!showCharacter) {
			return
		}

		setTransitionDuration("3s")
		setTimeout(() => {
			setPosition(showCharacterPosition)
		}, 0)
	}

	function afterPositionChanged10000() {
		const isHidden =
			position.left === hiddenPosition.left && position.top === hiddenPosition.top
		if (isHidden || !fly || showCharacter) {
			return
		}

		const randomPosition: BalloonPosition = {
			top: `${innerHeight * Math.random()}px`,
			left: `${innerWidth * Math.random()}px`,
		}
		setPosition(randomPosition)
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onFlyChanged, [fly])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onShowCharacterChanged, [showCharacter])
	useTimeoutEffect(afterPositionChanged10000, 10000, [position])

	return (
		<div
			className={classNames("balloon", `balloon-${number}`, {
				"show-character": showCharacter,
			})}
			style={{
				left: position.left,
				top: position.top,
				transitionDuration: transitionDuration,
			}}
		>
			<span
				className={classNames("character", showCharacter ? "opacity-[0.75]" : "opacity-0")}
			>
				{BalloonCharacters[number - 1]}
			</span>
			<img
				className={classNames("image", { "animated-image": !showCharacter })}
				alt={"Balon " + number}
				src={image}
			/>
		</div>
	)
}

export default Balloon
