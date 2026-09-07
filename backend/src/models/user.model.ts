import mongoose, { Schema, Document } from 'mongoose';

// Define the roles available in the system
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ORGANIZATION = 'ORGANIZATION',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
}

// Define the interface for TypeScript type checking
export interface IUser extends Document {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  password_hash?: string;
  google_id?: string;
  role: UserRole;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Mongoose Schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null/undefined values
      trim: true,
      lowercase: true,
    },
    password_hash: {
      type: String,
      required: false,
    },
    google_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
export default mongoose.model<IUser>('User', UserSchema);
