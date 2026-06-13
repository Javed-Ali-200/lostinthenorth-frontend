import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { Prisma } from '@prisma/client';

/**
 * GET /api/custom-trips/admin
 * Admin: List all custom trip requests
 */
export async function GET(req: NextRequest) {
    try {
        const user = await authenticate(req);
        requireAdmin(user);

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const where: Prisma.CustomTripWhereInput = {};
        if (status) {
            where.status = status as any;
        }

        const trips = await prisma.customTrip.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                hotel: true,
                car: true,
            },
        });

        return successResponse(trips, 'Custom trip requests retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
