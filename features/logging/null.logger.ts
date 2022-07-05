import ILogger from "@/features/logging/logger.interface"

class NullLogger implements ILogger {
	public clear() {
		// Intentionally empty
	}

	public debug() {
		// Intentionally empty
	}

	public error() {
		// Intentionally empty
	}

	public info() {
		// Intentionally empty
	}

	public warn() {
		// Intentionally empty
	}
}

export default NullLogger
