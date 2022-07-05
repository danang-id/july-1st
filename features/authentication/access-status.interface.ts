import User from "@/features/authentication/user.interface"

interface AccessStatus {
	granted: boolean
	user?: User
}

export default AccessStatus
