import { Temporal } from "@js-temporal/polyfill"
import { withIronSessionApiRoute } from "iron-session/next"
import type { NextApiRequest, NextApiResponse } from "next"

import Config from "@/common/config"
import { hasPropertyType } from "@/common/object-helper"
import AuthenticationError from "@/enums/authentication-error.enum"
import AuthenticationService from "@/features/authentication/authentication.service"
import User from "@/features/authentication/user.interface"

const protectionService = new AuthenticationService()

function parseAuthenticationRequest(request: NextApiRequest): AuthenticationRequest | undefined {
	const body = request.body
	const validated =
		hasPropertyType(body, "date", "number") &&
		hasPropertyType(body, "month", "number") &&
		hasPropertyType(body, "year", "number") &&
		hasPropertyType(body, "passcode", "string")

	if (!validated) {
		return
	}

	return body as AuthenticationRequest
}

export interface AuthenticationRequest {
	date: number
	month: number
	year: number
	passcode: string
}

export interface AuthenticationResponse {
	ok: boolean
	error?: AuthenticationError
	birthday?: string
	user?: User
}

async function handler(request: NextApiRequest, response: NextApiResponse<AuthenticationResponse>) {
	if (request.method !== "POST") {
		response.status(405).json({
			ok: false,
			error: AuthenticationError.MethodNotAllowed,
		})
		return
	}

	const requestBody = parseAuthenticationRequest(request)
	if (!requestBody) {
		return response.status(400).json({
			ok: false,
			error: AuthenticationError.MalformedRequest,
		})
	}

	const birthday = new Temporal.PlainDate(requestBody.year, requestBody.month, requestBody.date)
	const [ok, error] = protectionService.authenticate(birthday, requestBody.passcode)
	if (!ok || error) {
		return response.status(403).json({
			ok: ok,
			error: error,
		})
	}

	const user: User = {
		name: Config.server.name,
		signedInAt: Temporal.Now.zonedDateTimeISO().toString(),
	}

	request.session.accessGranted = ok
	request.session.user = user
	await request.session.save()

	return response.json({
		ok: ok,
		birthday: birthday.toString(),
		user: user,
	})
}

export default withIronSessionApiRoute(handler, Config.server.session)
