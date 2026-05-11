import { Schema, model, models } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    image?: string;
    phone?: string;
    country?: string;
    password?: string;
    role: 'regular' | 'admins' | 'instructors' | 'workers';
    isVerified: boolean;
    verificationToken?: string;
    verificationExpires?: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    image: { type: String },
    phone: { type: String },
    country: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ['regular', 'admins', 'instructors', 'workers'],
        default: 'regular'
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationExpires: { type: Date }
}, { timestamps: true });

const User = models.User || model<IUser>('User', UserSchema);
export default User;