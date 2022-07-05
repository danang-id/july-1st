import { Temporal } from "@js-temporal/polyfill"
import { IronSessionOptions } from "iron-session"
import getConfig from "next/config"

export interface PublicRuntimeConfig {
	environment: string
	application: {
		name: string
		shortName: string
		description: string
	}
	age: Temporal.Duration
	title: string
}

export interface ServerRuntimeConfig {
	authentication: {
		disabled: boolean
		useBirthdayValidation: boolean
	}
	birthday: Temporal.PlainDate
	name: string
	passcode?: string
	session: IronSessionOptions
}

class Config {
	private static readonly config = getConfig()

	public static readonly public: PublicRuntimeConfig = Config.config.publicRuntimeConfig

	public static readonly server: ServerRuntimeConfig = Config.config.serverRuntimeConfig
}

export default Config
