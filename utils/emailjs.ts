import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const CUSTOM_TRIP_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CUSTOM_TRIP_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

// ─── Booking Confirmation (Hotel / Tour / Car) ─────────────────────────────
export interface BookingEmailParams {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceTitle: string;
    serviceType: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    totalPrice: number;
    specialRequests?: string;
    bookingNumber?: string;
}

export const sendBookingConfirmationEmail = async (
    params: BookingEmailParams
): Promise<void> => {
    const templateParams = {
        to_name: params.customerName,
        to_email: params.customerEmail,
        reply_to: params.customerEmail,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        service_title: params.serviceTitle,
        service_type: params.serviceType,
        start_date: params.startDate,
        end_date: params.endDate,
        number_of_people: params.numberOfPeople,
        total_price: `PKR ${params.totalPrice.toLocaleString()}`,
        special_requests: params.specialRequests || 'None',
        booking_number: params.bookingNumber || 'N/A',
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};

// ─── Custom Trip Request ───────────────────────────────────────────────────
export interface CustomTripEmailParams {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    destination: string;
    days: number;
    numberOfPeople: number;
    startDate?: string;
    activities: string;
}

export const sendCustomTripEmail = async (
    params: CustomTripEmailParams
): Promise<void> => {
    const templateParams = {
        to_name: params.customerName,
        to_email: params.customerEmail,
        reply_to: params.customerEmail,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        destination: params.destination,
        days: params.days,
        number_of_people: params.numberOfPeople,
        start_date: params.startDate || 'Flexible',
        activities: params.activities,
    };

    await emailjs.send(SERVICE_ID, CUSTOM_TRIP_TEMPLATE_ID, templateParams, PUBLIC_KEY);
};

export const initEmailJS = () => {
    emailjs.init(PUBLIC_KEY);
};
