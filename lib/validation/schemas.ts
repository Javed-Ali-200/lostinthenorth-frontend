export const adminLoginSchema = {
    body: {
        email: { required: true, type: 'email' as const },
        password: { required: true, type: 'string' as const, minLength: 6 },
    },
};

export const adminRefreshSchema = {
    body: {
        refreshToken: { required: true, type: 'string' as const },
    },
};

export const adminChangePasswordSchema = {
    body: {
        oldPassword: { required: true, type: 'string' as const },
        newPassword: { required: true, type: 'string' as const, minLength: 6 },
    },
};

export const createTourSchema = {
    body: {
        title: { required: true, type: 'string' as const, minLength: 3 },
        description: { required: true, type: 'string' as const, minLength: 10 },
        price: { required: true, type: 'number' as const },
        duration: { required: true, type: 'number' as const },
        location: { required: true, type: 'string' as const },
    },
};

export const updateTourSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};

export const createHotelSchema = {
    body: {
        name: { required: true, type: 'string' as const, minLength: 2 },
        location: { required: true, type: 'string' as const },
        description: { required: true, type: 'string' as const, minLength: 10 },
        pricePerNight: { required: true, type: 'number' as const },
    },
};

export const updateHotelSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};

export const createCarSchema = {
    body: {
        name: { required: true, type: 'string' as const, minLength: 2 },
        type: { required: true, type: 'string' as const },
        pricePerDay: { required: true, type: 'number' as const },
        seats: { required: true, type: 'number' as const },
        transmission: { required: true, type: 'string' as const },
        fuelType: { required: true, type: 'string' as const },
    },
};

export const updateCarSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};

export const createTrekkingSchema = {
    body: {
        title: { required: true, type: 'string' as const, minLength: 3 },
        description: { required: true, type: 'string' as const, minLength: 10 },
        price: { required: true, type: 'number' as const },
        duration: { required: true, type: 'number' as const },
        location: { required: true, type: 'string' as const },
        difficulty: { required: false, enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'] },
    },
};

export const updateTrekkingSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        title: { required: false, type: 'string' as const, minLength: 3 },
        price: { required: false, type: 'number' as const },
        duration: { required: false, type: 'number' as const },
    },
};

export const createBookingSchema = {
    body: {
        customerName: { required: true, type: 'string' as const, minLength: 2 },
        customerEmail: { required: true, type: 'email' as const },
        customerPhone: { required: true, type: 'string' as const, minLength: 7 },
        serviceType: { required: true, type: 'string' as const, enum: ['TOUR', 'CAR', 'HOTEL', 'OFFER', 'TREKKING'] },
        serviceId: { required: true, type: 'string' as const },
        startDate: { required: true, type: 'string' as const },
        endDate: { required: true, type: 'string' as const },
        numberOfPeople: { required: false, type: 'number' as const },
        specialRequests: { required: false, type: 'string' as const },
    },
};

export const updateBookingStatusSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        status: {
            required: true,
            type: 'string' as const,
            enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'EXPEDITION_LIVE', 'COMPLETED', 'CANCELLED'],
        },
    },
};

export const createCustomTripSchema = {
    body: {
        customerName: { required: true, type: 'string' as const, minLength: 2 },
        customerEmail: { required: true, type: 'email' as const },
        customerPhone: { required: true, type: 'string' as const, minLength: 7 },
        destination: { required: true, type: 'string' as const, minLength: 2 },
        days: { required: true, type: 'number' as const },
        activities: { required: true, type: 'string' as const, minLength: 3 },
    },
};

export const updateCustomTripSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        status: {
            required: false,
            type: 'string' as const,
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'MODIFIED'],
        },
    },
};
