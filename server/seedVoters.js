import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {faker} from '@faker-js/faker';
import Voter from './models/voterModel.js';

dotenv.config({path: 'config/.env'});


const STATES = [
  "Lagos", "Abuja", "Kano", "Kaduna", "Rivers", "Oyo", "Enugu", "Anambra",
  "Edo", "Delta", "Plateau", "Osun", "Borno", "Bauchi", "Benue", "Niger",
  "Kogi", "Cross River", "Ekiti", "Imo", "Sokoto", "Kebbi", "Taraba", "Gombe"
];

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedVoters =async(req, res, next)=>{
    try {

      await connectDB();
        const voters = [];

        for(let i =0; i < 50; i++){
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName });
            const password = faker.internet.password();
            const voterId = faker.string.alphanumeric({ length: 10, casing: 'upper' });
            const phone = faker.phone.number("+234##########");
            const state = faker.helpers.arrayElement(STATES);

            voters.push({
            firstName,
            lastName,
            email,
            password, // optionally hash this later
            voterId,
            phone,
            state,
            hasVoted: false
          });
        }


      await Voter.insertMany(voters);
    console.log("✅ 50 Dummy voters seeded successfully!");
    process.exit();

    } catch (error) {
        console.error("❌ Failed to seed voters:", error);
        process.exit(1);
    }
}

seedVoters();