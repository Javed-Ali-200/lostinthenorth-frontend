import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate, requireAdmin } from '@/lib/auth';
import { validate } from '@/lib/validate';
import { updateHotelSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { uploadMultipleToSupabase } from '@/lib/storage';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/hotels/[id]
 * Get details of a single hotel
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const hotel = await prisma.hotel.findUnique({
            where: { id },
        });

        if (!hotel) {
            return errorResponse('Hotel not found.', 404);
        }

        return successResponse(hotel, 'Hotel retrieved successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * PATCH /api/hotels/[id]
 * Update a hotel (Admin only)
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        // Ensure hotel exists
        const existingHotel = await prisma.hotel.findUnique({ where: { id } });
        if (!existingHotel) {
            return errorResponse('Hotel not found.', 404);
        }

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

        const valErrors = validate(updateHotelSchema, { params: { id } });
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
        if (data.location !== undefined) updateData.location = data.location;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.pricePerNight !== undefined) updateData.pricePerNight = parseFloat(data.pricePerNight);
        if (data.image !== undefined) updateData.image = data.image;
        if (data.images !== undefined) {
            const hotelImages = parseArray(data.images);
            updateData.images = hotelImages;
            if (hotelImages && hotelImages.length > 0 && !data.image) {
                updateData.image = hotelImages[0];
            }
        }
        if (data.amenities !== undefined) updateData.amenities = parseArray(data.amenities);
        if (data.rating !== undefined) updateData.rating = parseFloat(data.rating);
        if (data.roomTypes !== undefined) updateData.roomTypes = parseArray(data.roomTypes);
        if (data.available !== undefined) updateData.available = data.available === true || data.available === 'true';
        if (data.address !== undefined) updateData.address = data.address;
        if (data.phone !== undefined) updateData.phone = data.phone;
        if (data.email !== undefined) updateData.email = data.email;

        const updatedHotel = await prisma.hotel.update({
            where: { id },
            data: updateData,
        });

        return successResponse(updatedHotel, 'Hotel updated successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}

/**
 * DELETE /api/hotels/[id]
 * Delete a hotel (Admin only)
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const user = await authenticate(req);
        requireAdmin(user);

        const existingHotel = await prisma.hotel.findUnique({ where: { id } });
        if (!existingHotel) {
            return errorResponse('Hotel not found.', 404);
        }

        await prisma.hotel.delete({
            where: { id },
        });

        return successResponse(null, 'Hotel deleted successfully');
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
