import AppError from "../errors/AppError.js";

describe("AppError Unit Tests", () => {
  it("should be able to create an error with message and status code", () => {
    const error = new AppError("Not Found", 404);

    
    expect(error.statusCode).toBe(404);
  });

  it("should be an instance of Error", () => {
    const error = new AppError("Internal", 500);

    
    expect(error).toBeInstanceOf(Error);
  });
});