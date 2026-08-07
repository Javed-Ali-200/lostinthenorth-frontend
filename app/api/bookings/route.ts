import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { validate } from '@/lib/validate';
import { createBookingSchema } from '@/lib/validation/schemas';
import { successResponse, errorResponse } from '@/lib/apiResponse';
import { ServiceType, Prisma } from '@prisma/client';

/**
 * Resolve service price based on serviceType and serviceId using transaction context.
 */
const resolveServicePrice = async (
    serviceType: ServiceType,
    serviceId: string,
    startDate: string,
    endDate: string,
    numberOfPeople: number,
    addOns: string[],
    tx: Prisma.TransactionClient
): Promise<{ price: number; relatedField: any }> => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

    switch (serviceType) {
        case 'TOUR': {
            const tour = await tx.tour.findUnique({ where: { id: serviceId } });
            if (!tour) throw new Error('Tour not found.');
            if (!tour.available) throw new Error('Tour is not available.');
            return { price: Number(tour.price) * numberOfPeople, relatedField: { tourId: serviceId } };
        }
        case 'HOTEL': {
            const hotel = await tx.hotel.findUnique({ where: { id: serviceId } });
            if (!hotel) throw new Error('Hotel not found.');
            if (!hotel.available) throw new Error('Hotel is not available.');
            return { price: Number(hotel.pricePerNight) * days * numberOfPeople, relatedField: { hotelId: serviceId } };
        }
        case 'CAR': {
            const car = await tx.car.findUnique({ where: { id: serviceId } });
            if (!car) throw new Error('Car not found.');
            if (!car.available) throw new Error('Car is not available.');

            let basePrice = Number(car.pricePerDay) * days;
            const ADD_ON_PRICES: Record<string, number> = {
                gps: 250,
                child: 150,
                wifi: 175,
                ski: 300,
            };

            const addOnPrice = addOns.reduce((sum, id) => sum + (ADD_ON_PRICES[id] || 0) * days, 0);
            const subtotal = basePrice + addOnPrice;
            const tax = Math.round(subtotal * 0.12);
            const finalPrice = subtotal + tax;

            return { price: finalPrice, relatedField: { carId: serviceId } };
        }
        case 'OFFER': {
            const offer = await tx.offer.findUnique({ where: { id: serviceId } });
            if (!offer) throw new Error('Offer not found.');
            if (!offer.active) throw new Error('Offer is no longer active.');
            const discountedPrice = Number(offer.price) - (Number(offer.price) * Number(offer.discount)) / 100;
            return { price: discountedPrice * numberOfPeople, relatedField: { offerId: serviceId } };
        }
        case 'TREKKING': {
            const trekking = await tx.trekking.findUnique({ where: { id: serviceId } });
            if (!trekking) throw new Error('Trekking not found.');
            if (!trekking.available) throw new Error('Trekking is not available.');
            return { price: Number(trekking.price) * numberOfPeople, relatedField: { trekkingId: serviceId } };
        }
        default:
            throw new Error('Invalid service type.');
    }
};

/**
 * POST /api/bookings
 * Guest creates a booking - no authentication required.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const valErrors = validate(createBookingSchema, { body });
        if (valErrors) {
            return errorResponse('Validation failed', 422, valErrors);
        }

        const {
            customerName,
            customerEmail,
            customerPhone,
            serviceType,
            serviceId,
            startDate,
            endDate,
            numberOfPeople = 1,
            specialRequests,
            addOns = [],
        } = body;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start.getTime() < new Date().setHours(0, 0, 0, 0)) {
            return errorResponse('Start date cannot be in the past.', 400);
        }
        if (end <= start) {
            return errorResponse('End date must be after start date.', 400);
        }

        const booking = await prisma.$transaction(async (tx) => {
            const year = new Date().getFullYear();
            const prefix = `LIN-${year}-`;
            const count = await tx.booking.count({ where: { bookingNumber: { startsWith: prefix } } });
            const bookingNumber = `${prefix}${String(count + 1).padStart(4, '0')}`;

            const { price, relatedField } = await resolveServicePrice(
                serviceType as ServiceType,
                serviceId,
                startDate,
                endDate,
                parseInt(numberOfPeople, 10),
                addOns,
                tx
            );

            return tx.booking.create({
                data: {
                    bookingNumber,
                    customerName,
                    customerEmail,
                    customerPhone,
                    serviceType: serviceType as ServiceType,
                    serviceId,
                    startDate: start,
                    endDate: end,
                    totalPrice: price,
                    numberOfPeople: parseInt(numberOfPeople, 10),
                    specialRequests: specialRequests || null,
                    addOns: Array.isArray(addOns) ? addOns : [],
                    ...relatedField,
                },
            });
        });

        return successResponse(booking, 'Booking created successfully', 201);
    } catch (err: any) {
        return errorResponse(err.message || 'Server error', 500);
    }
}
