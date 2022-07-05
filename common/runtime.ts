class Runtime {
	public static isClient() {
		return typeof window !== "undefined"
	}

	public static isServer() {
		return typeof window === "undefined"
	}
}

export default Runtime
