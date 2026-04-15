export type ApiEnvelope<T> = {
  success: true | false;
  status: "success" | "error";
  data: T | null;
  meta?: Record<string, unknown>;
  error?: Array<{ message: string; code?: string }>;
};

export function ok<T>(data: T, meta?: Record<string, unknown>): ApiEnvelope<T> {
  return {
    success: true,
    status: "success",
    data,
    meta,
  };
}

export function fail(message: string, code?: string): ApiEnvelope<null> {
  return {
    success: false,
    status: "error",
    data: null,
    error: [{ message, code }],
  };
}
