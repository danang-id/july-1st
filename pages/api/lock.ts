import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"

import Config from "@/common/config"

export interface LockResponse {
	ok: boolean
}

async function handler(request: NextApiRequest, response: NextApiResponse<LockResponse>) {
	request.session.destroy()

	request.session.accessGranted = false
	request.session.user = null
	await request.session.save()

	return response.json({ ok: true })
}

export default withIronSessionApiRoute(handler, Config.server.session)
