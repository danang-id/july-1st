export function hasPropertyType(object: unknown, property: string, type: string) {
	if (!object || typeof object !== "object") {
		return false
	}

	// @ts-ignore
	return property in object && typeof object[property] === type
}
