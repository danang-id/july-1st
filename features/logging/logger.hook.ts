import Environment from "@/common/environment"
import AggregateLogger from "@/features/logging/aggregate.logger"
import ConsoleLogger from "@/features/logging/console.logger"
import ILogger from "@/features/logging/logger.interface"
import NullLogger from "@/features/logging/null.logger"
import PinoLogger from "@/features/logging/pino.logger"

interface LoggerHookOptions {
	console?: boolean
	pino?: boolean
}

const DefaultOptions: LoggerHookOptions = {
	console: false,
	pino: true,
}

function useLogger(fun: Function, options?: LoggerHookOptions): ILogger
function useLogger(name: string, options?: LoggerHookOptions): ILogger
function useLogger(nameOrFunction: Function | string, options = DefaultOptions): ILogger {
	if (Environment.isProduction()) {
		return new NullLogger()
	}

	const name = typeof nameOrFunction === "string" ? nameOrFunction : nameOrFunction.name
	const loggers: ILogger[] = []

	if (options?.console === true) {
		loggers.push(new ConsoleLogger(name))
	}

	if (options?.pino === true) {
		loggers.push(new PinoLogger(name))
	}

	return new AggregateLogger(...loggers)
}

export default useLogger
