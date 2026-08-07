import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { Prisma } from '@prisma/client';

/**
 * GET /api/bookings/admin
 * Admin: List all bookings
 */
export async function GET(req: NextRequest) {
    try {
        const user = await authenticate(req);
        requireAdmin(user);

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const serviceType = searchParams.get('serviceType');

        const where: Prisma.BookingWhereInput = {};
        if (status) {
            where.status = status as any;
        }
        if (serviceType) {
            where.serviceType = serviceType as any;
        }

        const bookings = await prisma.booking.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                tour: true,
                hotel: true,
                car: true,
                offer: true,
                trekking: true,
            },
        });

        return successResponse(bookings, 'Bookings retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
