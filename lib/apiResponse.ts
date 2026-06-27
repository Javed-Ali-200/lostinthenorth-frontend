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
    let finalStatus = statusCode;
    
    // Auto-detect authentication/token issues and return 401 Unauthorized
    const authErrorMessages = [
        'jwt expired',
        'jwt malformed',
        'invalid signature',
        'jwt signature is required',
        'authentication token is required',
        'user not found. token may be invalid.',
        'invalid token',
    ];
    
    if (authErrorMessages.includes(message.toLowerCase())) {
        finalStatus = 401;
    } else if (
        message.toLowerCase().includes('access denied') || 
        message.toLowerCase().includes('privileges required')
    ) {
        finalStatus = 403;
    }

    const body: any = { success: false, message };
    if (errors) body.errors = errors;
    return NextResponse.json(body, { status: finalStatus });
};
