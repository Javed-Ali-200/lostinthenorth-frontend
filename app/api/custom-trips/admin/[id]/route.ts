import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { updateCustomTripSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * PATCH /api/custom-trips/admin/[id]
 * Admin: Update custom trip status, notes, pricing, or relationships
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        // Ensure custom trip exists
        const existingTrip = await prisma.customTrip.findUnique({ where: { id } });
        if (!existingTrip) {
            return errorResponse('Custom trip request not found.', 404);
        }

        let data: any = {};
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const imageFile = formData.get('image') as File | null;
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                data.image = await uploadToSupabase(imageFile, 'custom-trips');
            }
        } else {
            data = await req.json();
        }

        const valErrors = validate(updateCustomTripSchema, { params: { id }, body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const updateData: Prisma.CustomTripUpdateInput = {};
        if (data.status) updateData.status = data.status;
        if (data.adminNotes !== undefined) updateData.adminNotes = data.adminNotes;
        if (data.totalPrice !== undefined) updateData.totalPrice = parseFloat(data.totalPrice);
        
        const tripImage = data.image || data.posterImage;
        if (tripImage !== undefined) updateData.image = tripImage;

        if (data.hotelId !== undefined) {
            updateData.hotel = data.hotelId ? { connect: { id: data.hotelId } } : { disconnect: true };
        }
        if (data.carId !== undefined) {
            updateData.car = data.carId ? { connect: { id: data.carId } } : { disconnect: true };
        }

        const updatedTrip = await prisma.customTrip.update({
            where: { id },
            data: updateData,
        });

        return successResponse(updatedTrip, 'Custom trip updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
