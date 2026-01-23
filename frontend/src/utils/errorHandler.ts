export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return 'An unexpected error occurred';
};
