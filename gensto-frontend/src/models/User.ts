import { Schema, model, models } from 'mongoose';

// Define the interface for TypeScript support
interface IUser {
    name: string;
    email: string;
    image?: string;
    role: 'regular' | 'admins' | 'instructors' | 'workers';
    isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: String,
    role: {
        type: String,
        enum: ['regular', 'admins', 'instructors', 'workers'],
        default: 'regular'
    },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// This prevents Mongoose from trying to re-compile the model on every hot-reload
const User = models.User || model<IUser>('User', UserSchema);

export default User;