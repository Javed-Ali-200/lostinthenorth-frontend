import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { createTourSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase, uploadMultipleToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

/**
 * GET /api/tours
 * List all tours with filters
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const available = searchParams.get('available');
        const featured = searchParams.get('featured');
        const location = searchParams.get('location');
        const search = searchParams.get('search');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const minDuration = searchParams.get('minDuration');
        const maxDuration = searchParams.get('maxDuration');

        const where: Prisma.TourWhereInput = {};

        if (available !== null) {
            where.available = available === 'true';
        }
        if (featured === 'true') {
            where.featured = true;
        }
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        if (minDuration || maxDuration) {
            where.duration = {};
            if (minDuration) where.duration.gte = parseInt(minDuration, 10);
            if (maxDuration) where.duration.lte = parseInt(maxDuration, 10);
        }

        const tours = await prisma.tour.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return successResponse(tours, 'Tours retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * POST /api/tours
 * Create a new tour (Admin only)
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

        const valErrors = validate(createTourSchema, { body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return [];
        };

        const newTour = await prisma.tour.create({
            data: {
                title: data.title,
                description: data.description,
                price: parseFloat(data.price),
                duration: parseInt(data.duration, 10),
                location: data.location,
                image: data.image || null,
                images: parseArray(data.images),
                featured: data.featured === true || data.featured === 'true',
                itinerary: data.itinerary || null,
                included: parseArray(data.included),
                excluded: parseArray(data.excluded),
                maxGroupSize: data.maxGroupSize ? parseInt(data.maxGroupSize, 10) : 20,
                available: data.available !== false && data.available !== 'false',
            },
        });

        return successResponse(newTour, 'Tour created successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
