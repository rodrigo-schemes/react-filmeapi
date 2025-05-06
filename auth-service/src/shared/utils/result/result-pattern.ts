export class Result<T> {
	private constructor(
		public readonly isSuccess: boolean,
		public readonly data?: T,
		public readonly errors?: string[],
	) {}

	static ok<T>(data: T): Result<T> {
		return new Result<T>(true, data);
	}

	static fail<T>(errors: string[]): Result<T> {
		return new Result<T>(false, undefined, errors);
	}
}
