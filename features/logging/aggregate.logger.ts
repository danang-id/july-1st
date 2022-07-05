import ILogger, { LogFunction } from "@/features/logging/logger.interface"

class AggregateLogger implements ILogger {
	private readonly loggers: ILogger[]

	public constructor(...loggers: ILogger[]) {
		this.loggers = loggers
	}

	private static write(log: LogFunction, ...args: unknown[]) {
		// @ts-ignore
		log(...args)
	}

	public clear() {
		for (const logger of this.loggers) {
			logger.clear()
		}
	}

	public debug(...args: unknown[]) {
		for (const logger of this.loggers) {
			AggregateLogger.write(logger.debug.bind(logger), ...args)
		}
	}

	public error(...args: unknown[]) {
		for (const logger of this.loggers) {
			AggregateLogger.write(logger.error.bind(logger), ...args)
		}
	}

	public info(...args: unknown[]) {
		for (const logger of this.loggers) {
			AggregateLogger.write(logger.info.bind(logger), ...args)
		}
	}

	public warn(...args: unknown[]) {
		for (const logger of this.loggers) {
			AggregateLogger.write(logger.warn.bind(logger), ...args)
		}
	}
}

export default AggregateLogger
