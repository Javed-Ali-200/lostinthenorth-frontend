import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(req: NextRequest) {
    try {
        const user = await authenticate(req);
        requireAdmin(user);

        const admin = await prisma.user.findUnique({
            where: { id: user.id },
            select: { id: true, email: true, name: true, role: true, createdAt: true }
        });

        if (!admin) {
            return errorResponse('Admin not found.', 404);
        }

        return successResponse(admin, 'Profile retrieved');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 401);
    }
}
