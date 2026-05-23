const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly code?: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type RequestOptions = {
    method?: string;
    body?: unknown;
    token?: string | null;
    headers?: Record<string, string>;
};

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
    authToken = token;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const {method = "GET", body, token, headers = {}} = options;
    const correlationId = crypto.randomUUID();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Correlation-ID": correlationId,
            ...(token ?? authToken ? {Authorization: `Bearer ${token ?? authToken}`} : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        let message = response.statusText;
        let code: string | undefined;
        try {
            const payload = (await response.json()) as { message?: string; code?: string };
            message = payload.message ?? message;
            code = payload.code;
        } catch {
            // resposta sem JSON
        }
        throw new ApiError(message, response.status, code);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}
