export class CodedError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export class UnauthorizedActionError extends CodedError {
  constructor() {
    super('Unauthorized action', 401);
  }
}

export class MissingInputError extends CodedError {
  constructor(resource: string) {
    const message = `Missing value for ${resource}`;
    super(message, 400);
  }
}
