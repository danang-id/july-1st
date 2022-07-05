import { Temporal } from "@js-temporal/polyfill"

import Config from "@/common/config"
import AuthenticationError from "@/enums/authentication-error.enum"

export type AuthenticationResult = [boolean, AuthenticationError | undefined]

class AuthenticationService {
	public constructor() {}

	private static validateBirthday(date?: Temporal.PlainDate) {
		if (!Config.server.authentication.useBirthdayValidation) {
			return true
		}

		if (!date) {
			return false
		}

		const birthday = Config.server.birthday
		return (
			birthday.year === date.year &&
			birthday.month === date.month &&
			birthday.day === date.day
		)
	}

	private static validatePasscode(passcode?: string) {
		if (!passcode) {
			return false
		}

		return passcode === Config.server.passcode
	}

	public authenticate(birthday: Temporal.PlainDate, passcode: string): AuthenticationResult {
		if (!AuthenticationService.validateBirthday(birthday)) {
			return [false, AuthenticationError.InvalidBirthday]
		}

		if (!AuthenticationService.validatePasscode(passcode)) {
			return [false, AuthenticationError.InvalidPasscode]
		}

		return [true, undefined]
	}
}

export default AuthenticationService
