export interface ClearFunction {
	(): void
}

export interface LogFunction {
	<T extends object>(obj: T, msg?: string, ...args: any[]): void
	(obj: unknown, msg?: string, ...args: any[]): void
	(msg: string, ...args: any[]): void
}

interface ILogger {
	clear: ClearFunction
	debug: LogFunction
	error: LogFunction
	info: LogFunction
	warn: LogFunction
}

export default ILogger
