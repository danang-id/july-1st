import classNames from "classnames"
import { useEffect, useState } from "react"

interface BulbInfo {
	color: string
	className: string
	image: string
}

const DefaultBulbs: BulbInfo[] = [
	{
		color: "Biru",
		className: "blue-bulb",
		image: "/assets/images/bulb-blue.png",
	},
	{
		color: "Hijau",
		className: "green-bulb",
		image: "/assets/images/bulb-green.png",
	},
	{
		color: "Oranye",
		className: "orange-bulb",
		image: "/assets/images/bulb-orange.png",
	},
	{
		color: "Pink",
		className: "pink-bulb",
		image: "/assets/images/bulb-pink.png",
	},
	{
		color: "Merah",
		className: "red-bulb",
		image: "/assets/images/bulb-red.png",
	},
	{
		color: "Kuning",
		className: "yellow-bulb",
		image: "/assets/images/bulb-yellow.png",
	},
]

const AnimatedBulbs: BulbInfo[] = [
	{
		color: "Biru",
		className: "blue-bulb",
		image: "/assets/images/bulb-blue-animation.png",
	},
	{
		color: "Hijau",
		className: "green-bulb",
		image: "/assets/images/bulb-green-animation.png",
	},
	{
		color: "Oranye",
		className: "orange-bulb",
		image: "/assets/images/bulb-orange-animation.png",
	},
	{
		color: "Pink",
		className: "pink-bulb",
		image: "/assets/images/bulb-pink-animation.png",
	},
	{
		color: "Merah",
		className: "red-bulb",
		image: "/assets/images/bulb-red-animation.png",
	},
	{
		color: "Kuning",
		className: "yellow-bulb",
		image: "/assets/images/bulb-yellow-animation.png",
	},
]

interface BulbProps {
	alt: string
	className?: string
	image: string
	shown: boolean
}

function Bulb({ alt, className, image, shown }: BulbProps) {
	const defaultClassName = classNames("bulb", shown ? "opacity-100" : "opacity-40")

	return <img className={classNames(defaultClassName, className)} alt={alt} src={image} />
}

export interface BulbsProps {
	animation?: boolean
	shown?: boolean
}

function Bulbs({ animation = false, shown = false }: BulbsProps) {
	const [bulbs, setBulbs] = useState<BulbInfo[]>([...DefaultBulbs])

	function onAnimationChanged() {
		setBulbs(animation ? [...AnimatedBulbs] : [...DefaultBulbs])
	}

	useEffect(onAnimationChanged, [animation])

	return (
		<div className="bulbs">
			{bulbs?.map((bulb, index) => (
				<Bulb
					key={index}
					alt={`Lampu ${bulb.color}`}
					className={bulb.className}
					image={bulb.image}
					shown={shown}
				/>
			))}
		</div>
	)
}

export default Bulbs
