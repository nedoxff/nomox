import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function ensuredDefined<T>(
	item: T | undefined | null,
	message: string,
): T {
	if (item === undefined || item === null) {
		throw new Error(message);
	}
	return item;
}
