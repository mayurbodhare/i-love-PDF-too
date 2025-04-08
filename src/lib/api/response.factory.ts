import { NextResponse } from "next/server";
import type {
	ApiError,
	ApiResponse,
	ResponseFormatter,
} from "./core/response.interface";
import { DefaultFormatter } from "./formatters/default.formatter";
import { headers } from "next/headers";

export class ResponseFactory {
	constructor(private formatter: ResponseFormatter) {}

	createSuccess<T>(
		data: T,
		status: number,
		meta?: Record<string, unknown>,
		options? : {
			isRaw? : boolean,
			headers? : HeadersInit
		}
	): NextResponse<ApiResponse<T>> {

		if (options?.isRaw) {
			return new NextResponse(data as BodyInit, {
				status,
				headers : options.headers
			})
		}

		const response = this.formatter.formatSuccess(data, status, meta);
		return NextResponse.json(response, { status });
	}


	createError(
		error: ApiError,
		status: number,
	): NextResponse<ApiResponse<never>> {
		const response = this.formatter.formatError(error, status);
		return NextResponse.json(response, { status });
	}
}

// Default instance
export const responseFactory = new ResponseFactory(new DefaultFormatter());

// ### Corrected code
// Correctly typed exports with preserved context
// export const successResponse = <T>(
//     data: T,
//     status: number,
//     meta?: Record<string, unknown>
// ): NextResponse<ApiResponse<T>> =>
//     responseFactory.createSuccess<T>(data, status, meta);

// export const errorResponse = (
//     error: ApiError,
//     status: number
// ): NextResponse<ApiResponse<never>> =>
//     responseFactory.createError(error, status);

// Corrected exports with proper binding
export const successResponse =
	responseFactory.createSuccess.bind(responseFactory);
export const errorResponse = responseFactory.createError.bind(responseFactory);
