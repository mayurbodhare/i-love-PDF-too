
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error? : ApiError;
    meta?: {
        status: number;
        message?: string;
        timestamp: string;
        [key: string]: unknown;
    };
}

export interface ApiError {
    status : number;
    message? : string;
    details? : unknown;
    timestamp : string;
}

export interface ResponseFormatter {
    formatSuccess<T>(data: T, status: number, meta?: Record<string, unknown>): ApiResponse<T>;
    formatError(error: ApiError, status: number): ApiResponse<never>;
}