import { NextResponse } from 'next/server';

export const successResponse = (
    data: any = null,
    message: string = 'Success',
    statusCode: number = 200
) => {
    return NextResponse.json({
        success: true,
        message,
        data,
    }, { status: statusCode });
};

export const errorResponse = (
    message: string = 'Error',
    statusCode: number = 500,
    errors: any = null
) => {
    const body: any = { success: false, message };
    if (errors) body.errors = errors;
    return NextResponse.json(body, { status: statusCode });
};
