import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { createHotelSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadMultipleToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

/**
 * GET /api/hotels
 * List all hotels with optional filters
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const available = searchParams.get('available');
        const location = searchParams.get('location');

        const where: Prisma.HotelWhereInput = {};

        if (available !== null) {
            where.available = available === 'true';
        }
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }

        const hotels = await prisma.hotel.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return successResponse(hotels, 'Hotels retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * POST /api/hotels
 * Create a new hotel (Admin only)
 */
export async function POST(req: NextRequest) {
    try {
        const user = await authenticate(req);
        requireAdmin(user);

        let data: any = {};
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                if (key === 'amenities' || key === 'roomTypes' || key === 'images') {
                    if (!data[key]) data[key] = [];
                    if (typeof value === 'string') {
                        try {
                            const parsed = JSON.parse(value);
                            if (Array.isArray(parsed)) {
                                data[key].push(...parsed);
                            } else {
                                data[key].push(value);
                            }
                        } catch {
                            data[key].push(value);
                        }
                    }
                } else {
                    data[key] = value;
                }
            });

            const imagesFiles = formData.getAll('images') as File[];
            const filteredImagesFiles = imagesFiles.filter(f => f instanceof File && f.size > 0);
            if (filteredImagesFiles.length > 0) {
                data.images = await uploadMultipleToSupabase(filteredImagesFiles, 'hotels');
            }
        } else {
            data = await req.json();
        }

        const valErrors = validate(createHotelSchema, { body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return [];
        };

        const hotelImages = parseArray(data.images);
        const mainImage = data.image || (hotelImages.length > 0 ? hotelImages[0] : null);

        const newHotel = await prisma.hotel.create({
            data: {
                name: data.name,
                location: data.location,
                description: data.description,
                pricePerNight: parseFloat(data.pricePerNight),
                image: mainImage,
                images: hotelImages,
                amenities: parseArray(data.amenities),
                rating: data.rating ? parseFloat(data.rating) : 0,
                roomTypes: parseArray(data.roomTypes),
                available: data.available !== false && data.available !== 'false',
                address: data.address || null,
                phone: data.phone || null,
                email: data.email || null,
            },
        });

        return successResponse(newHotel, 'Hotel created successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
