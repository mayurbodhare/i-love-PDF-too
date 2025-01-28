import { NextResponse } from "next/server";
import type { ApiError, ApiResponse, ResponseFormatter } from "./core/response.interface";
import { DefaultFormatter } from "./formatters/default.formatter";


export class ResponseFactory {
    constructor(private formatter : ResponseFormatter) {}

    createSuccess<T>(data: T, status: number, meta?: Record<string, unknown>): NextResponse<ApiResponse<T>> {
        const response = this.formatter.formatSuccess(data, status, meta);
        return NextResponse.json(response, { status });
    }

    createError(error: ApiError, status: number): NextResponse<ApiResponse<never>> {
        const response = this.formatter.formatError(error, status);
        return NextResponse.json(response, { status });
    }
    
}


// Default instance
export const responseFactory = new ResponseFactory(new DefaultFormatter());