import UAParser from "ua-parser-js"

import Runtime from "@/common/runtime"

class UserAgent {
	public static parse(uaString?: string) {
		if (!uaString && Runtime.isServer()) {
			throw new Error(
				"UserAgent.parse() without uaString parameter only available on Client Runtime."
			)
		}

		return new UAParser(uaString ? uaString : navigator.userAgent)
	}
}

export default UserAgent
