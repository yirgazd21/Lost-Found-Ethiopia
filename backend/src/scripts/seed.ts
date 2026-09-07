import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import LostItem from '../models/lost-item.model';
import FoundItem from '../models/found-item.model';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lost-and-found';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully.');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await LostItem.deleteMany({});
    await FoundItem.deleteMany({});

    console.log('Creating users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user1 = await User.create({
      name: 'Abebe Kebede',
      phone: '0911223344',
      password_hash: hashedPassword,
    });

    const user2 = await User.create({
      name: 'Sara Alemu',
      phone: '0922334455',
      password_hash: hashedPassword,
    });

    const user3 = await User.create({
      name: 'Ephrem Tadesse',
      phone: '0933445566',
      password_hash: hashedPassword,
    });

    console.log('Creating lost items...');
    await LostItem.create([
      {
        user_id: user1._id,
        title: 'iPhone 13 Pro - Blue',
        category: 'ELECTRONICS',
        description: 'Lost my blue iPhone 13 Pro. It has a clear case with a small sticker on the back.',
        location: 'Bole International Airport, Terminal 2',
        lost_date: new Date('2023-10-15'),
        status: 'ACTIVE',
      },
      {
        user_id: user2._id,
        title: 'Brown Leather Wallet',
        category: 'WALLET',
        description: 'Contains my Commercial Bank of Ethiopia debit card and Ethiopian ID.',
        location: 'Piassa, near Taytu Hotel',
        lost_date: new Date('2023-10-20'),
        status: 'ACTIVE',
      },
      {
        user_id: user1._id,
        title: 'Toyota Car Keys',
        category: 'KEYS',
        description: 'A set of Toyota keys with a red lanyard.',
        location: 'Edna Mall Cinema',
        lost_date: new Date('2023-10-22'),
        status: 'ACTIVE',
      },
      {
        user_id: user3._id,
        title: 'MacBook Pro 14"',
        category: 'ELECTRONICS',
        description: 'Space Gray MacBook Pro in a black sleeve. Had some important work documents.',
        location: 'Tomoca Coffee, Churchill Road',
        lost_date: new Date('2023-10-25'),
        status: 'ACTIVE',
      },
      {
        user_id: user2._id,
        title: 'Silver Chain Necklace',
        category: 'JEWELRY',
        description: 'A thin silver chain with a cross pendant. Very high sentimental value.',
        location: 'Bole Medhanialem',
        lost_date: new Date('2023-10-26'),
        status: 'ACTIVE',
      },
      {
        user_id: user3._id,
        title: 'National ID Card',
        category: 'DOCUMENT',
        description: 'Lost my Kebele ID around Mexico square. Name: Ephrem Tadesse.',
        location: 'Mexico Square',
        lost_date: new Date('2023-10-27'),
        status: 'ACTIVE',
      }
    ]);

    console.log('Creating found items...');
    await FoundItem.create([
      {
        user_id: user2._id,
        title: 'HP Envy Laptop',
        category: 'ELECTRONICS',
        public_description: 'Found a silver HP laptop in a black sleeve.',
        private_description: 'The laptop has a dent on the bottom left corner and the wallpaper is a picture of a dog.',
        location: 'Addis Ababa University, Main Campus Library',
        found_date: new Date('2023-10-18'),
        status: 'ACTIVE',
      },
      {
        user_id: user1._id,
        title: 'Gold Ring',
        category: 'JEWELRY',
        public_description: 'Found a gold ring near the entrance.',
        private_description: 'The ring has the initials "A.K" engraved on the inside.',
        location: 'Bole Medhanialem Church',
        found_date: new Date('2023-10-21'),
        status: 'ACTIVE',
      },
      {
        user_id: user2._id,
        title: 'Ethiopian Passport',
        category: 'DOCUMENT',
        public_description: 'Found an Ethiopian passport belonging to someone named Dawit.',
        private_description: 'The passport expires in 2025 and has a visa for Kenya.',
        location: 'Meskel Square',
        found_date: new Date('2023-10-23'),
        status: 'ACTIVE',
      },
      {
        user_id: user3._id,
        title: 'Set of House Keys',
        category: 'KEYS',
        public_description: 'Found a bunch of 4 keys with a yellow keychain.',
        private_description: 'The keychain says "Sunshine" on it.',
        location: 'Friendship Park',
        found_date: new Date('2023-10-24'),
        status: 'ACTIVE',
      },
      {
        user_id: user1._id,
        title: 'Samsung Galaxy S22',
        category: 'ELECTRONICS',
        public_description: 'Found a black Samsung phone near the ATM.',
        private_description: 'The phone screen has a crack at the top right, and the lockscreen has a pattern lock.',
        location: 'Kazanchis, near ECA',
        found_date: new Date('2023-10-26'),
        status: 'ACTIVE',
      },
      {
        user_id: user3._id,
        title: 'Black Leather Bag',
        category: 'BAG',
        public_description: 'Found a black leather bag left on a bench.',
        private_description: 'Contains a pair of reading glasses, a notebook, and some loose change.',
        location: 'Entoto Park',
        found_date: new Date('2023-10-28'),
        status: 'ACTIVE',
      }
    ]);

    console.log('Database seeded successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
