import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { updateTourSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase, uploadMultipleToSupabase } from '@/lib/storage';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/tours/[id]
 * Get details of a single tour
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const tour = await prisma.tour.findUnique({
            where: { id },
        });

        if (!tour) {
            return errorResponse('Tour not found.', 404);
        }

        return successResponse(tour, 'Tour retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * PATCH /api/tours/[id]
 * Update a tour (Admin only)
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        // Ensure tour exists
        const existingTour = await prisma.tour.findUnique({ where: { id } });
        if (!existingTour) {
            return errorResponse('Tour not found.', 404);
        }

        let data: any = {};
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            formData.forEach((value, key) => {
                if (key === 'included' || key === 'excluded' || key === 'images') {
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
                data.image = await uploadToSupabase(imageFile, 'tours');
            }

            const filteredImagesFiles = imagesFiles.filter(f => f instanceof File && f.size > 0);
            if (filteredImagesFiles.length > 0) {
                data.images = await uploadMultipleToSupabase(filteredImagesFiles, 'tours');
            }
        } else {
            data = await req.json();
        }

        const valErrors = validate(updateTourSchema, { params: { id } });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return undefined;
        };

        const updateData: any = {};
        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.price !== undefined) updateData.price = parseFloat(data.price);
        if (data.duration !== undefined) updateData.duration = parseInt(data.duration, 10);
        if (data.location !== undefined) updateData.location = data.location;
        if (data.image !== undefined) updateData.image = data.image;
        if (data.images !== undefined) updateData.images = parseArray(data.images);
        if (data.featured !== undefined) updateData.featured = data.featured === true || data.featured === 'true';
        if (data.itinerary !== undefined) updateData.itinerary = data.itinerary;
        if (data.included !== undefined) updateData.included = parseArray(data.included);
        if (data.excluded !== undefined) updateData.excluded = parseArray(data.excluded);
        if (data.maxGroupSize !== undefined) updateData.maxGroupSize = parseInt(data.maxGroupSize, 10);
        if (data.available !== undefined) updateData.available = data.available === true || data.available === 'true';

        const updatedTour = await prisma.tour.update({
            where: { id },
            data: updateData,
        });

        return successResponse(updatedTour, 'Tour updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * DELETE /api/tours/[id]
 * Delete a tour (Admin only)
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        const existingTour = await prisma.tour.findUnique({ where: { id } });
        if (!existingTour) {
            return errorResponse('Tour not found.', 404);
        }

        await prisma.tour.delete({
            where: { id },
        });

        return successResponse(null, 'Tour deleted successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
