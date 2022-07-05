import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"

import Config from "@/common/config"
import User from "@/features/authentication/user.interface"

export interface AccessStatusResponse {
	granted: boolean
	user?: User
}

function handler(request: NextApiRequest, response: NextApiResponse<AccessStatusResponse>) {
	const { user } = request.session
	if (!user) {
		return response.json({ granted: false })
	}

	return response.json({ granted: true, user: user })
}

export default withIronSessionApiRoute(handler, Config.server.session)
