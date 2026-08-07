import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { createCarSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase, uploadMultipleToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

/**
 * GET /api/cars
 * List all cars with optional filters
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const available = searchParams.get('available');
        const type = searchParams.get('type');

        const where: Prisma.CarWhereInput = {};

        if (available !== null) {
            where.available = available === 'true';
        }
        if (type) {
            where.type = { contains: type, mode: 'insensitive' };
        }

        const cars = await prisma.car.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return successResponse(cars, 'Cars retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * POST /api/cars
 * Create a new car (Admin only)
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
                if (key === 'features' || key === 'images') {
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

            const imageFile = formData.get('image') as File | null;
            const imagesFiles = formData.getAll('images') as File[];

            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                data.image = await uploadToSupabase(imageFile, 'cars');
            }

            const filteredImagesFiles = imagesFiles.filter(f => f instanceof File && f.size > 0);
            if (filteredImagesFiles.length > 0) {
                data.images = await uploadMultipleToSupabase(filteredImagesFiles, 'cars');
            }
        } else {
            data = await req.json();
        }

        const valErrors = validate(createCarSchema, { body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return [];
        };

        const newCar = await prisma.car.create({
            data: {
                name: data.name,
                type: data.type,
                pricePerDay: parseFloat(data.pricePerDay),
                image: data.image || '',
                images: parseArray(data.images),
                features: parseArray(data.features),
                seats: parseInt(data.seats, 10),
                transmission: data.transmission,
                fuelType: data.fuelType,
                available: data.available !== false && data.available !== 'false',
            },
        });

        return successResponse(newCar, 'Car created successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
