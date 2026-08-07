// ─── Tour Types ───────────────────────────────────────────────────────────────
export interface Tour {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number; // days
    location: string;
    images: string[];
    featured: boolean;
    itinerary?: string | null; // JSON string
    included: string[];
    excluded: string[];
    maxGroupSize: number;
    available: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// ─── Trekking Types ─────────────────────────────────────────────────────────────
export interface Trekking {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number; // days
    location: string;
    image: string | null;
    images: string[];
    difficulty: string;
    rating: number;
    reviewsCount: number;
    featured: boolean;
    itinerary?: string | null; // JSON string
    included: string[];
    excluded: string[];
    highlights: string[];
    locationTags: string[];
    maxGroupSize: number;
    available: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// ─── Hotel Types ───────────────────────────────────────────────────────────────
export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    pricePerNight: number;
    images: string[];
    amenities: string[];
    rating: number;
    roomTypes: string[];
    available: boolean;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// ─── Car Types ──────────────────────────────────────────────────────────────
export interface Car {
    id: string;
    name: string;
    type: string;
    pricePerDay: number;
    image: string;
    images: string[];
    features: string[];
    seats: number;
    transmission: string;
    fuelType: string;
    available: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// ─── Booking Types ─────────────────────────────────────────────────────────────
export type ServiceType = 'TOUR' | 'HOTEL' | 'CAR' | 'OFFER' | 'TREKKING';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';

export interface Booking {
    id: string;
    bookingNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceType: ServiceType;
    serviceId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    numberOfPeople: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    specialRequests?: string | null;
    addOns: string[];
    tour?: Tour;
    hotel?: Hotel;
    car?: Car;
    trekking?: Trekking;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface BookingFormData {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceType: ServiceType;
    serviceId: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    specialRequests?: string;
    addOns?: string[];
}

// ─── Custom Trip Types ────────────────────────────────────────────────────────
export type CustomTripStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED';

export interface CustomTrip {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    destination: string;
    days: number;
    activities: string;
    totalPrice: number;
    status: CustomTripStatus;
    adminNotes?: string | null;
    startDate?: string | null;
    numberOfPeople: number;
    posterImage?: string | null;
    image?: string | null;
    hotel?: Hotel;
    car?: Car;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// ─── Admin Types ────────────────────────────────────────────────────────────
export interface Admin {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    admin: Admin;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// ─── Itinerary ────────────────────────────────────────────────────────────────
export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    activities?: string[];
}
