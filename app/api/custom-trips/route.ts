import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validate } from '@/lib/validate';
import { createCustomTripSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

/**
 * POST /api/custom-trips
 * Guest submits a custom trip request
 */
export async function POST(req: NextRequest) {
    try {
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

        const valErrors = validate(createCustomTripSchema, { body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const tripData: Prisma.CustomTripCreateInput = {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            destination: data.destination,
            days: parseInt(data.days, 10),
            activities: data.activities,
            numberOfPeople: data.numberOfPeople ? parseInt(data.numberOfPeople, 10) : 1,
            startDate: data.startDate ? new Date(data.startDate) : null,
            totalPrice: data.totalPrice ? parseFloat(data.totalPrice) : 0,
            image: data.image || data.posterImage || null,
            hotel: data.hotelId ? { connect: { id: data.hotelId } } : undefined,
            car: data.carId ? { connect: { id: data.carId } } : undefined,
        };

        const newTrip = await prisma.customTrip.create({
            data: tripData,
        });

        return successResponse(newTrip, 'Custom trip request submitted successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
