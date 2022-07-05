import pino, { Logger, LoggerOptions } from "pino"

import Runtime from "@/common/runtime"
import ILogger, { LogFunction } from "@/features/logging/logger.interface"

interface PinoLoggerOptions {
	pretty?: boolean
}

const DefaultOptions: PinoLoggerOptions = {
	pretty: true,
}

class PinoLogger implements ILogger {
	private readonly pino: Logger
	private readonly name: string | undefined

	public constructor(name?: string, options = DefaultOptions) {
		let pinoOptions: LoggerOptions
		if (Runtime.isServer()) {
			pinoOptions = {}
		} else {
			pinoOptions = {
				browser: {
					transmit: {
						level: "info",
						send: (level, event) => {
							const message = event.messages[0]
							const headers = {
								"Access-Control-Allow-Origin": "*",
								"Access-Control-Allow-Headers":
									"Origin, X-Requested-With, Content-Type, Accept",
								type: "application/json",
							}
							const data = { message: message, level: level }
							const blob = new Blob([JSON.stringify(data)], headers)

							navigator.sendBeacon(`/api/log`, blob)
						},
					},
				},
			}
		}

		if (options.pretty) {
			pinoOptions.transport = {
				target: "pino-pretty",
				options: {
					colorize: true,
				},
			}
		}

		this.pino = pino(pinoOptions)
		this.name = name
	}

	private write(log: LogFunction, ...args: unknown[]) {
		if (Runtime.isServer()) {
			// @ts-ignore
			log(...args)
			return
		}

		const messages = [`[${this.name}]`, ...args]
		log(messages.join(" "))
	}

	public clear() {
		// Implementation Not Available in Pino
	}

	public debug(...args: unknown[]) {
		this.write(this.pino.debug.bind(this.pino), ...args)
	}

	public error(...args: unknown[]) {
		this.write(this.pino.error.bind(this.pino), ...args)
	}

	public info(...args: unknown[]) {
		this.write(this.pino.info.bind(this.pino), ...args)
	}

	public warn(...args: unknown[]) {
		this.write(this.pino.warn.bind(this.pino), ...args)
	}
}

export default PinoLogger
