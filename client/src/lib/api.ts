import axios, {
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from "axios";
import { env } from "./env";
import type { ApiEnvelope } from "@/types";
let tokenGetter: () => Promise<string | null>;

export function setApiTokenGetter(getter: () => Promise<string | null>) {
  tokenGetter = getter;
}

const api = axios.create({
  baseURL: env.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (!tokenGetter) return config;

  const token = await tokenGetter();

  if (token) {
    config.headers = config.headers || ({} as AxiosRequestHeaders);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function getErrorMsg(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "Request failed"
    );
  }
  if (error instanceof Error) return error.message;
  return "Request failed";
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await api.get<ApiEnvelope<T>>(url, config);

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.errors?.[0].message || "Request failed");
    }

    return response.data.data;
  } catch (err) {
    console.log(err);

    throw new Error(getErrorMsg(err));
  }
}
