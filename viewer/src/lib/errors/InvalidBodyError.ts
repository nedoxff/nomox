import type typia from "typia";

export default class InvalidBodyError extends Error {
	constructor(errors: typia.IValidation.IError[]) {
		super(JSON.stringify(errors, undefined, 4));
		Object.setPrototypeOf(this, InvalidBodyError.prototype);
	}
}
