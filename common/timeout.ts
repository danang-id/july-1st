import { DependencyList, EffectCallback, useEffect } from "react"

export function withTimeout(callback: () => void, ms: number) {
	return () => setTimeout(callback, ms)
}

export function useTimeoutEffect(
	effect: EffectCallback,
	ms: number,
	deps?: DependencyList | undefined
) {
	useEffect(() => {
		let destructor: () => void
		const timeout = setTimeout(() => {
			const result = effect()
			if (typeof result === "function") {
				destructor = result
			}
		}, ms)
		return () => {
			if (timeout) {
				clearTimeout(timeout)
			}
			if (typeof destructor === "function") {
				destructor()
			}
		}
	}, deps)
}
