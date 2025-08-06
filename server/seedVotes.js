import mongoose from "mongoose";
import dotenv from "dotenv";
import Voter from "./models/voterModel.js";
import Party from "./models/partyModel.js";
import Election from "./models/electionModel.js";
import Candidate from "./models/candidateModel.js";
import Vote from "./models/voteModel.js";

dotenv.config({path: 'config/.env'});


const MONGO_URI = process.env.MONGO_URI 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedVotes =async()=>{
    try {
        await connectDB();

        // firstly we are going to find all voters who hasn't voted or where has voted is false
        const voters = await Voter.find({hasVoted:false})

        // then we fetch all candidates, and add their party and the type of eletion they are going for 
        const candidates =await Candidate.find() .populate({
        path: "party",
        select: "_id name logo description acronym",
      }).populate({
        path: "election",
        select: "_id name type",
      })

        if(!candidates){
            console.error("❌ No candidates found. Please seed candidates first.");
            return;
        }

        const votes = [];

        for (let voter of voters){ //this is going to loop for all the registerd voters who hasn't voted
            // we get a random candidate e.g candidate[2], candidate[6]
            const randomCandidate =candidates[Math.floor(Math.random() * candidates.length)]

            const vote =new Vote({
                voter: voter._id,
                candidate: randomCandidate._id,
                party: randomCandidate.party._id,
                election: randomCandidate.election._id,
                state: voter.state,
            })

            votes.push(vote.save());
            await Voter.findByIdAndUpdate(voter._id, { hasVoted: true })
        }

        await Promise.all(votes);

        console.log(`✅ Successfully created ${votes.length} votes`);
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding votes:", error);
        mongoose.connection.close();
    }
}

seedVotes();