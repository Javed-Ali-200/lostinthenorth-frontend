import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { createTrekkingSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadToSupabase, uploadMultipleToSupabase } from '@/lib/storage';
import { Prisma } from '@prisma/client';

/**
 * GET /api/trekkings
 * List all trekkings with optional filters
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const available = searchParams.get('available');
        const featured = searchParams.get('featured');
        const location = searchParams.get('location');
        const search = searchParams.get('search');
        const difficulty = searchParams.get('difficulty');
        const locationTag = searchParams.get('locationTag');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        const where: Prisma.TrekkingWhereInput = {};

        if (available !== null) {
            where.available = available === 'true';
        }
        if (featured === 'true') {
            where.featured = true;
        }
        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }
        if (difficulty) {
            where.difficulty = difficulty;
        }
        if (locationTag) {
            where.locationTags = { has: locationTag };
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

        const trekkings = await prisma.trekking.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return successResponse(trekkings, 'Trekkings retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * POST /api/trekkings
 * Create a new trekking expedition (Admin only)
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
                if (key === 'locationTags' || key === 'included' || key === 'excluded' || key === 'highlights' || key === 'images') {
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
                data.image = await uploadToSupabase(imageFile, 'trekkings');
            }

            const filteredImagesFiles = imagesFiles.filter(f => f instanceof File && f.size > 0);
            if (filteredImagesFiles.length > 0) {
                data.images = await uploadMultipleToSupabase(filteredImagesFiles, 'trekkings');
            }
        } else {
            data = await req.json();
        }

        const valErrors = validate(createTrekkingSchema, { body: data });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const parseArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim()) return val.split(',').map((x: string) => x.trim());
            return [];
        };

        const newTrekking = await prisma.trekking.create({
            data: {
                title: data.title,
                description: data.description,
                price: parseFloat(data.price),
                duration: parseInt(data.duration, 10),
                location: data.location,
                image: data.image || null,
                images: parseArray(data.images),
                difficulty: data.difficulty || 'Moderate',
                rating: data.rating ? parseFloat(data.rating) : 4.8,
                reviewsCount: data.reviewsCount ? parseInt(data.reviewsCount, 10) : 50,
                featured: data.featured === true || data.featured === 'true',
                itinerary: data.itinerary || null,
                included: parseArray(data.included),
                excluded: parseArray(data.excluded),
                highlights: parseArray(data.highlights),
                locationTags: parseArray(data.locationTags),
                maxGroupSize: data.maxGroupSize ? parseInt(data.maxGroupSize, 10) : 12,
                available: data.available !== false && data.available !== 'false',
            },
        });

        return successResponse(newTrekking, 'Trekking created successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
