import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User, { UserRole } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lost-and-found';

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully.');

    const adminEmail = 'admin@example.com';
    const adminPhone = '0900000000';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user already exists with email: ${adminEmail}`);
      process.exit(0);
    }

    console.log('Creating Admin user...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'System Admin',
      phone: adminPhone,
      email: adminEmail,
      password_hash: hashedPassword,
      role: UserRole.ADMIN,
    });

    console.log('Admin user created successfully! 🛡️');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: admin123`);
    console.log(`Phone: ${adminPhone}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
