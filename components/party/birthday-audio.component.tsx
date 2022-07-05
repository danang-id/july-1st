import { ForwardedRef, forwardRef } from "react"

export interface BirthdayAudioProps {
	loop?: boolean
}

function BirthdayAudio({ loop }: BirthdayAudioProps, ref: ForwardedRef<HTMLAudioElement>) {
	return (
		<audio className="birthday-audio" loop={loop} ref={ref}>
			<source src="/assets/audio/birthday-song.mp3" />
			<track kind="captions" title="Birthday Song" />
		</audio>
	)
}

export default forwardRef(BirthdayAudio)
