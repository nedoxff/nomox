export default class NotAuthorizedError extends Error {
	constructor(msg?: string) {
		super(msg);
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
}
