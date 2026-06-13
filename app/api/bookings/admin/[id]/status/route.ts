import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { updateBookingStatusSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * PATCH /api/bookings/admin/[id]/status
 * Admin: Update booking status
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        const body = await req.json();
        const valErrors = validate(updateBookingStatusSchema, { params: { id }, body });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const existingBooking = await prisma.booking.findUnique({ where: { id } });
        if (!existingBooking) {
            return errorResponse('Booking not found.', 404);
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: body.status,
            },
        });

        return successResponse(updatedBooking, 'Booking status updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
