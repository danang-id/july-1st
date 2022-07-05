import { NextApiRequest, NextApiResponse } from "next"

import Config from "@/common/config"
import Environment from "@/common/environment"

function handler(request: NextApiRequest, response: NextApiResponse) {
	if (!Environment.isDevelopment()) {
		return response.end()
	}

	return response.json({
		server: Config.server,
		public: Config.public,
	})
}

export default handler
