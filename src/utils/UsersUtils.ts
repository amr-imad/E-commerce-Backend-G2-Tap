import { db } from '../database';
import Users from '../database/models/users';
import { CustomError } from '../middleware/customError';

export async function findUserByEmail(email: string): Promise<Users> {
    const user = await db.Users.findOne({
        where: { email }
    });
    if (user) {
        return user;
    } else {
        throw new CustomError('User not found', 400);
    }
}

export async function checkIfUserEmailExists(email: string): Promise<boolean> {
    try {
        const results = await findUserByEmail(email);
        return true;
    } catch (error) {
        return false;
    }
}

export async function createUserDB(
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    DOB: number,
    imageUrl: string
) {
    try {
        const result = await db.Users.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            DOB,
            imageUrl,
            role
        });
        return result;
    } catch (err) {
        throw new CustomError('Error creating User', 500);
    }
}
export async function getUserById(id: number): Promise<Users> {
    const user = await Users.findByPk(id);
    if (user) return user;
    throw new CustomError('User not found', 400);
}
export async function updateUserById(id: number, firstName: string, lastName: string, phone: string, DOB: number, imageUrl: string) {
    try {
        const user = await db.Users.update(
            {
                firstName,
                lastName,
                phone: phone ?? '',
                DOB: DOB ?? '1999-09-09',
                imageUrl: imageUrl ?? ''
            },
            {
                where: { id }
            }
        );
    } catch (error) {
        throw new CustomError('unable to update', 500);
    }
}

export async function getUserProfile(id: number): Promise<Users> {
    const user = await Users.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [db.Cart, db.Address, db.Orders, db.Tranactions, db.Wishlist, db.Ratings]
    });
    if (user) {
        return user;
    } else {
        throw new CustomError('unable to get profile', 400);
    }
}