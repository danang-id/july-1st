import Config from "@/common/config"

class Environment {
	public static is(environment?: string): boolean {
		if (!Config.public.environment || !environment) {
			return false
		}

		return Config.public.environment.toLowerCase() === environment.toLowerCase()
	}

	public static isDevelopment(): boolean {
		return Environment.is("development")
	}

	public static isProduction(): boolean {
		return Environment.is("production")
	}

	public static isTest(): boolean {
		return Environment.is("test")
	}
}

export default Environment
