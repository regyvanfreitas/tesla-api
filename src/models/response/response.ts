export const createApiResponse = (success, data, message) => {
  return {
    success: success,
    data: data,
    message: message,
  }
}
