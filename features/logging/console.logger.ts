import ILogger, { LogFunction } from "@/features/logging/logger.interface"

class ConsoleLogger implements ILogger {
	private readonly name: string

	public constructor(name: string) {
		this.name = name
	}

	private write(log: LogFunction, ...args: unknown[]) {
		// @ts-ignore
		log(`[${this.name}]`, ...args)
	}

	public clear() {
		console.clear()
	}

	public debug(...args: unknown[]) {
		this.write(console.debug.bind(this), ...args)
	}

	public error(...args: unknown[]) {
		this.write(console.error.bind(this), ...args)
	}

	public info(...args: unknown[]) {
		this.write(console.info.bind(this), ...args)
	}

	public warn(...args: unknown[]) {
		this.write(console.warn.bind(this), ...args)
	}
}

export default ConsoleLogger
