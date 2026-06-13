import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { generateToken, generateRefreshToken } from '@/lib/jwt';
import { validate } from '@/lib/validate';
import { adminLoginSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request
        const valErrors = validate(adminLoginSchema, { body });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const { email, password } = body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return errorResponse('Invalid email or password.', 401);
        }

        if (user.role !== 'ADMIN') {
            return errorResponse('Access denied. Admin privileges required.', 403);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse('Invalid email or password.', 401);
        }

        // Generate tokens
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });

        // Hash and store refresh token
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRT }
        });

        const admin = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        return successResponse({ token, refreshToken, admin }, 'Login successful');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
