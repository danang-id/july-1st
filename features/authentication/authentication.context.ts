import { createContext } from "react"

import AuthenticationError from "@/enums/authentication-error.enum"
import AccessStatus from "@/features/authentication/access-status.interface"

export interface ProtectionContextInfo {
	accessStatus: AccessStatus | undefined
	error: AuthenticationError | undefined
	authenticate: (passcode: string) => Promise<void>
	clearSession: () => Promise<void>
}

const AuthenticationContext = createContext<ProtectionContextInfo>({
	accessStatus: { granted: false },
	error: AuthenticationError.NotInitialized,
	authenticate: () => Promise.resolve(),
	clearSession: () => Promise.resolve(),
})

export default AuthenticationContext
