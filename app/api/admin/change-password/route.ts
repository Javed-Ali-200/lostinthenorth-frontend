import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { adminChangePasswordSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function PATCH(req: NextRequest) {
    try {
        const user = await authenticate(req);
        requireAdmin(user);

        const body = await req.json();

        const valErrors = validate(adminChangePasswordSchema, { body });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const { oldPassword, newPassword } = body;

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!dbUser) {
            return errorResponse('Admin not found.', 404);
        }

        const isMatch = await bcrypt.compare(oldPassword, dbUser.password);
        if (!isMatch) {
            return errorResponse('Current password is incorrect.', 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        return successResponse(null, 'Password updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 401);
    }
}
