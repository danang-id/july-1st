import useSWR from "swr"

import AccessStatus from "@/features/authentication/access-status.interface"

function useAccessStatus() {
	const { data, mutate } = useSWR<AccessStatus>("/api/access-status")

	return { accessStatus: data, mutateAccessStatus: mutate }
}

export default useAccessStatus
