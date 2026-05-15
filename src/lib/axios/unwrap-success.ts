export function unwrapSuccessData<T>(body: unknown): T {
  if (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    (body as { success: unknown }).success === true &&
    "data" in body
  ) {
    return (body as { data: T }).data
  }
  throw new Error("Unexpected API response shape")
}
