import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { updateCarSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase, uploadMultipleToSupabase } from '@/lib/storage';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/cars/[id]
 * Get details of a single car
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const car = await prisma.car.findUnique({
            where: { id },
        });

        if (!car) {
            return errorResponse('Car not found.', 404);
        }

        return successResponse(car, 'Car retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * PATCH /api/cars/[id]
 * Update a car (Admin only)
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        // Ensure car exists
        const existingCar = await prisma.car.findUnique({ where: { id } });
        if (!existingCar) {
            return errorResponse('Car not found.', 404);
        }

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

        const valErrors = validate(updateCarSchema, { params: { id } });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return undefined;
        };

        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.type !== undefined) updateData.type = data.type;
        if (data.pricePerDay !== undefined) updateData.pricePerDay = parseFloat(data.pricePerDay);
        if (data.image !== undefined) updateData.image = data.image;
        if (data.images !== undefined) updateData.images = parseArray(data.images);
        if (data.features !== undefined) updateData.features = parseArray(data.features);
        if (data.seats !== undefined) updateData.seats = parseInt(data.seats, 10);
        if (data.transmission !== undefined) updateData.transmission = data.transmission;
        if (data.fuelType !== undefined) updateData.fuelType = data.fuelType;
        if (data.available !== undefined) updateData.available = data.available === true || data.available === 'true';

        const updatedCar = await prisma.car.update({
            where: { id },
            data: updateData,
        });

        return successResponse(updatedCar, 'Car updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * DELETE /api/cars/[id]
 * Delete a car (Admin only)
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        const existingCar = await prisma.car.findUnique({ where: { id } });
        if (!existingCar) {
            return errorResponse('Car not found.', 404);
        }

        await prisma.car.delete({
            where: { id },
        });

        return successResponse(null, 'Car deleted successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
