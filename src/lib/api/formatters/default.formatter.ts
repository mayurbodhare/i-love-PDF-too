import type { ApiError, ApiResponse, ResponseFormatter } from "../core/response.interface";


export class DefaultFormatter implements ResponseFormatter {
    formatSuccess<T>(data: T, status: number, meta?: Record<string, unknown>): ApiResponse<T> {
        return {
            success: true,
            data,
            meta : {
                status,
                timestamp : new Date().toISOString(),
                ...meta
            }            
        };

    }
    formatError(error: ApiError, status: number): ApiResponse<never> {
        return {
            success: false,
            error : {
                ...error,
                details : process.env.NODE_ENV === 'development' ? error.details : undefined
            },
            meta : {
                status,
                timestamp : new Date().toISOString(),
            }
        }
    }

}