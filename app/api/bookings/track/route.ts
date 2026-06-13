import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/apiResponse';

/**
 * GET /api/bookings/track
 * Guest tracks booking by reference (bookingNumber) and email
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const bookingNumber = searchParams.get('bookingNumber');
        const email = searchParams.get('email');

        if (!bookingNumber || !email) {
            return errorResponse('Booking reference and email are required', 400);
        }

        const booking = await prisma.booking.findFirst({
            where: {
                bookingNumber,
                customerEmail: {
                    equals: email,
                    mode: 'insensitive',
                },
            },
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
            return errorResponse('Booking not found with provided reference and email.', 404);
        }

        return successResponse(booking, 'Booking found successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
