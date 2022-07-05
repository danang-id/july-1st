import { withIronSessionSsr } from "iron-session/next"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useContext } from "react"

import Config from "@/common/config"
import AuthenticationContext from "@/features/authentication/authentication.context"
import User from "@/features/authentication/user.interface"

export interface AuthenticatedSessionProps {
	granted: boolean
	user: User | undefined
}

function useAuthentication() {
	return useContext(AuthenticationContext)
}

export async function defaultAuthenticationHandler(context: GetServerSidePropsContext) {
	const { req: request, res: response } = context
	const { accessGranted, user } = request.session
	const allowedAccess = accessGranted === true && !!user

	if (!allowedAccess) {
		response.setHeader("location", "/gate/meet-the-guard")
		response.statusCode = 302
		response.end()

		return {
			props: {
				granted: false,
				user: undefined as User | undefined,
			},
		}
	}

	return {
		props: {
			granted: true,
			user: user,
		},
	}
}

export function withAuthentication(handler: GetServerSideProps) {
	return withIronSessionSsr(handler, Config.server.session)
}

export function withDefaultAuthentication(): GetServerSideProps<AuthenticatedSessionProps> {
	return withIronSessionSsr(defaultAuthenticationHandler, Config.server.session)
}

export default useAuthentication
