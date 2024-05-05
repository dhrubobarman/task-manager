class CustomAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.statusCode = statusCode;
  }
  public static create(message: string, statusCode: number) {
    return new CustomAPIError(message, statusCode);
  }
}

const createCustomError = (msg: string, statusCode: number) => {
  return new CustomAPIError(msg, statusCode);
};

export { CustomAPIError, createCustomError };
