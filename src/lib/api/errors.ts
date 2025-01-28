import type { ApiError } from "./core/response.interface";

export enum APIErrorCode {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_FOUND = 'NOT_FOUND',
    CONFLICT = 'CONFLICT',
    GONE = 'GONE',
    PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
    TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
    UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
    RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
    INVALID_FILE = 'INVALID_FILE',
    TASK_FAILED = 'TASK_FAILED',
    INVALID_INPUT = "INVALID_INPUT",
}

export const API_ERRORS : Record<APIErrorCode, { message: string; status : number }> = {
    [APIErrorCode.INTERNAL_SERVER_ERROR]: {
        message: "Internal Server Error",
        status: 500
    },
    [APIErrorCode.BAD_REQUEST]: {
        message: "Bad Request",
        status: 400
    },
    [APIErrorCode.UNAUTHORIZED]: {
        message: "Unauthorized",
        status: 401
    },
    [APIErrorCode.FORBIDDEN]: {
        message: "Forbidden",
        status: 403
    },
    [APIErrorCode.NOT_FOUND]: {
        message: "Not Found",
        status: 404
    },
    [APIErrorCode.CONFLICT]: {
        message: "Conflict",
        status: 409
    },
    [APIErrorCode.GONE]: {
        message: "Gone",
        status: 410
    },
    [APIErrorCode.PAYMENT_REQUIRED]: {
        message: "Payment Required",
        status: 402
    },
    [APIErrorCode.TOO_MANY_REQUESTS]: {
        message: "Too Many Requests",
        status: 429
    },
    [APIErrorCode.UNPROCESSABLE_ENTITY]: {
        message: "Unprocessable Entity",
        status: 422
    },
    [APIErrorCode.RATE_LIMIT_EXCEEDED]: {
        message: "Rate Limit Exceeded",
        status: 429
    },
    [APIErrorCode.INVALID_FILE]: {
        message: "Invalid File",
        status: 400
    },
    [APIErrorCode.TASK_FAILED]: {
        message: "Task Failed",
        status: 500
    },
    [APIErrorCode.INVALID_INPUT]: {
        message: "Invalid Input",
        status: 400
    }
};

export function createApiError(code: APIErrorCode, details?: unknown): ApiError {
    return {
        status: API_ERRORS[code].status,
        message: API_ERRORS[code].message,
        details,
        timestamp: new Date().toISOString()
    };
}