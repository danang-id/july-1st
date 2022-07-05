import React, { ChangeEvent, useEffect, useRef, useState } from "react"

import Alert from "@/common/alert"
import UserAgent from "@/common/user-agent"
import AuthenticationError from "@/enums/authentication-error.enum"
import useAuthentication, {
	withAuthentication,
} from "@/features/authentication/authentication.hook"
import BaseLayout from "@/layouts/base/base.layout"

function MeetTheGuardPage() {
	const passcodeInputRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [passcode, setPasscode] = useState<string>("")
	const { authenticate, error } = useAuthentication()

	function requestFullscreen() {
		const device = UserAgent.parse().getDevice()
		if (device.type !== "mobile") {
			return
		}

		const { documentElement } = document
		if (
			"requestFullscreen" in documentElement &&
			typeof documentElement.requestFullscreen === "function"
		) {
			documentElement.requestFullscreen().catch()
		} else if (
			"webkitRequestFullscreen" in documentElement &&
			typeof (documentElement as any).webkitRequestFullscreen === "function"
		) {
			;(documentElement as any).webkitRequestFullscreen()
		} else if (
			"msRequestFullscreen" in documentElement &&
			typeof (documentElement as any).msRequestFullscreen === "function"
		) {
			;(documentElement as any).msRequestFullscreen()
		}
	}

	function onPasscodeChanged() {
		if (passcode.length !== 4) {
			return
		}

		setLoading(true)
		authenticate(passcode).catch()
	}

	function onPasscodeInputChanged(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.value) {
			setPasscode("")
			return
		}

		let newPasscode = ""
		for (const char of event.target.value.split("")) {
			if (Number.isNaN(parseInt(char))) {
				continue
			}

			newPasscode += char
		}

		setPasscode(newPasscode)
	}

	function onErrorChanged() {
		if (!error || error === AuthenticationError.NotInitialized) {
			requestFullscreen()
			return
		}

		let message = "Hmm, ada yang salah dan seharusnya ini tidak terjadi."
		switch (error) {
			case AuthenticationError.InvalidBirthday:
				message =
					"Aku rasa hari ini bukan merupakan hari ulang tahun-mu. " +
					"Coba lagi di hari ulang tahun mu ya!"
				break
			case AuthenticationError.InvalidPasscode:
				message = "Passcode iPhone-mu salah. Coba lagi ya!"
				break
		}

		Alert.fire({
			icon: "error",
			text: message,
		}).then(() => {
			setPasscode("")
			setLoading(false)
			passcodeInputRef.current?.focus()
		})
	}

	useEffect(onErrorChanged, [error])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onPasscodeChanged, [passcode])

	return (
		<BaseLayout className="meet-the-guard-page">
			<img
				className="lock-animation"
				src="/assets/images/lock-animation.png"
				alt="Passcode iPhone"
			/>

			<div className="information-text">
				<p className="font-bold mb-2">Halo!</p>
				<p>Buat ngepastiin ini beneran kamu, coba masukin passcode iPhone kamu dong!</p>
			</div>

			<input
				ref={passcodeInputRef}
				className="passcode-input"
				type="password"
				inputMode="numeric"
				maxLength={4}
				disabled={loading}
				readOnly={loading}
				onChange={onPasscodeInputChanged}
				value={passcode}
			/>
		</BaseLayout>
	)
}

export const getServerSideProps = withAuthentication(async (context) => {
	const { req: request, res: response, resolvedUrl } = context
	const { accessGranted, user } = request.session
	const allowedAccess = accessGranted === true && !!user

	if (allowedAccess) {
		response.setHeader("location", "/party")
		response.statusCode = 302
		response.end()
	}

	return {
		props: {},
	}
})

export default MeetTheGuardPage
