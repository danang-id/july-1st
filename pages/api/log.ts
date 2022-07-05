import type { NextApiRequest, NextApiResponse } from "next"

import PinoLogger from "@/features/logging/pino.logger"

const logger = new PinoLogger()

export interface LogRequest {
	level?: string
	message?: string
}

export interface LogResponse {
	ok: boolean
	error?: string
}

async function handler(request: NextApiRequest, response: NextApiResponse<LogResponse>) {
	try {
		if (!request.body) {
			response.status(400).json({
				ok: false,
				error: "Malformed Request",
			})
			return
		}

		const { message, level = "info" }: LogRequest = request.body
		if (!message) {
			return response.status(400).json({
				ok: false,
				error: "Malformed Request",
			})
		}

		// @ts-ignore
		if (level in logger && typeof logger[level] === "function") {
			// @ts-ignore
			logger[level](message)
		}

		return response.status(200).json({
			ok: true,
		})
	} catch (exception) {
		return response.status(500).json({
			ok: false,
			error: `${exception}`,
		})
	}
}

export default handler
