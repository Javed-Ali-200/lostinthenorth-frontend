import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '@/lib/jwt';
import { validate } from '@/lib/validate';
import { adminRefreshSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const valErrors = validate(adminRefreshSchema, { body });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const { refreshToken: rToken } = body;

        // Decode refresh token
        const decoded = verifyRefreshToken(rToken);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user || !user.refreshToken) {
            return errorResponse('Invalid refresh token.', 401);
        }

        // Verify matches hash in DB
        const isMatch = await bcrypt.compare(rToken, user.refreshToken);
        if (!isMatch) {
            return errorResponse('Invalid refresh token.', 401);
        }

        // Generate new token pair
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });

        // Update database with new hashed token
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRT }
        });

        return successResponse({ token, refreshToken }, 'Token refreshed');
    } catch (err: any) {
        return errorResponse(err.message || 'Token refresh failed.', 401);
    }
}
