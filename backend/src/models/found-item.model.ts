import mongoose, { Schema, Document, Types } from 'mongoose';
import { ItemCategory, ItemStatus } from './lost-item.model';

export interface IFoundItem extends Document {
  user_id: Types.ObjectId;
  category: ItemCategory;
  title: string;
  public_description: string;
  private_description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  found_date: Date;
  status: ItemStatus;
  image_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FoundItemSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID (Finder) is required'],
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
    public_description: {
      type: String,
      required: [true, 'Public description is required'],
      trim: true,
      maxlength: 1000,
    },
    private_description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    location: {
      type: String,
      required: [true, 'Approximate found location is required'],
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    found_date: {
      type: Date,
      required: [true, 'Approximate found date is required'],
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

export default mongoose.model<IFoundItem>('FoundItem', FoundItemSchema);
