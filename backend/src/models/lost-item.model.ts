import mongoose, { Schema, Document, Types } from 'mongoose';

export enum ItemCategory {
  DOCUMENT = 'DOCUMENT',
  PHONE = 'PHONE',
  ELECTRONICS = 'ELECTRONICS',
  BAG = 'BAG',
  WALLET = 'WALLET',
  KEYS = 'KEYS',
  JEWELRY = 'JEWELRY',
  OTHER = 'OTHER',
}

export enum ItemStatus {
  ACTIVE = 'ACTIVE',
  MATCH_FOUND = 'MATCH_FOUND',
  RECOVERED = 'RECOVERED',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
}

export interface ILostItem extends Document {
  user_id: Types.ObjectId;
  category: ItemCategory;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  lost_date: Date;
  status: ItemStatus;
  image_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LostItemSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    category: {
      type: String,
      enum: Object.values(ItemCategory),
      required: [true, 'Item category is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: 1000,
    },
    location: {
      type: String,
      required: [true, 'Approximate location is required'],
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    lost_date: {
      type: Date,
      required: [true, 'Approximate lost date is required'],
    },
    status: {
      type: String,
      enum: Object.values(ItemStatus),
      default: ItemStatus.ACTIVE,
    },
    image_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILostItem>('LostItem', LostItemSchema);
