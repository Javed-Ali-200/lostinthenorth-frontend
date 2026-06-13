import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/apiResponse';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/bookings/admin/[id]
 * Admin: Get details of a single booking
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                tour: true,
                hotel: true,
                car: true,
                offer: true,
                payment: true,
                trekking: true,
            },
        });

        if (!booking) {
            return errorResponse('Booking not found.', 404);
        }

        return successResponse(booking, 'Booking retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
