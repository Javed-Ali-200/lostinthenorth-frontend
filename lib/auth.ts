import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';
import prisma from './prisma';

export interface AuthenticatedUser {
    id: string;
    email: string;
    name: string | null;
    role: string;
}

export const authenticate = async (req: NextRequest): Promise<AuthenticatedUser> => {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Fetch fresh user from DB
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
        throw new Error('User not found. Token may be invalid.');
    }

    return user;
};

export const requireAdmin = (user: AuthenticatedUser) => {
    if (user.role !== 'ADMIN') {
        throw new Error('Access denied. Admin privileges required.');
    }
};
