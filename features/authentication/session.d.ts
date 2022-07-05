// @ts-ignore
import User from "@/features/authentication/user.interface"

declare module "iron-session" {
	interface IronSessionData {
		accessGranted: boolean | undefined
		user: User | null | undefined
	}
}
