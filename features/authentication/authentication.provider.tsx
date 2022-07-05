import { Temporal } from "@js-temporal/polyfill"
import axios, { AxiosError } from "axios"
import Router from "next/router"
import { ReactNode, useEffect, useState } from "react"

import Config from "@/common/config"
import AuthenticationError from "@/enums/authentication-error.enum"
import useAccessStatus from "@/features/authentication/access-status.hook"
import AuthenticationContext from "@/features/authentication/authentication.context"
import useLogger from "@/features/logging/logger.hook"
import { AccessStatusResponse } from "@/pages/api/access-status"
import { AuthenticationResponse } from "@/pages/api/authenticate"
import { LockResponse } from "@/pages/api/lock"

export interface ProtectionProviderProps {
	children: ReactNode
}

function AuthenticationProvider({ children }: ProtectionProviderProps) {
	const logger = useLogger(AuthenticationProvider)
	const [ready, setReady] = useState<boolean>(false)
	const [error, setError] = useState<AuthenticationError | undefined>(
		AuthenticationError.NotInitialized
	)
	const { accessStatus, mutateAccessStatus } = useAccessStatus()

	function onMount() {
		getAccessStatus().catch()
	}

	function onAccessStatusAndReadyChanged() {
		if (!ready) {
			return
		}

		if (!accessStatus || !accessStatus.granted || !accessStatus.user) {
			Router.push("/gate/meet-the-guard").catch()
		}
	}

	async function getAccessStatus() {
		try {
			const { data: response } = await axios.get<AccessStatusResponse>("/api/access-status")
			await mutateAccessStatus(response)
			setReady(true)
		} catch (error) {
			if (error instanceof AxiosError && error?.response?.data) {
				await mutateAccessStatus(error.response.data)
				return
			}

			await mutateAccessStatus({ granted: false })
			throw error
		}
	}

	async function authenticate(passcode: string, redirectTo = "/") {
		setError(AuthenticationError.NotInitialized)

		const today = Temporal.Now.zonedDateTimeISO().toPlainDate()
		const birthday = today.subtract(Config.public.age)

		logger.info(
			`Age: ${Config.public.age.years} years. Today ${today}, expected birthday ${birthday}`
		)

		try {
			const { data: response } = await axios.post<AuthenticationResponse>(
				"/api/authenticate",
				{
					date: birthday.day,
					month: birthday.month,
					year: birthday.year,
					passcode: passcode,
				}
			)

			if (!response.ok || !response.user || response.error) {
				setError(response.error)
				await mutateAccessStatus({ granted: false })
				return
			}

			setError(undefined)
			await mutateAccessStatus({
				granted: true,
				user: response.user,
			})
			await Router.push(redirectTo)
		} catch (error) {
			if (error instanceof AxiosError && error?.response?.data) {
				setError(error.response.data.error)
				await mutateAccessStatus({ granted: false })
				return
			}

			setError(AuthenticationError.ClientError)
			await mutateAccessStatus({ granted: false })
			throw error
		}
	}

	async function clearSession() {
		setError(AuthenticationError.NotInitialized)
		await axios.get<LockResponse>("/api/lock")
		await mutateAccessStatus({ granted: false })
		await Router.push("/gate/meet-the-guard")
	}

	useEffect(onMount, [])
	useEffect(onAccessStatusAndReadyChanged, [accessStatus, ready])

	return (
		<AuthenticationContext.Provider value={{ accessStatus, error, authenticate, clearSession }}>
			{children}
		</AuthenticationContext.Provider>
	)
}

export default AuthenticationProvider
