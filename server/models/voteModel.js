import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    voter:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Voter'
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    },
    party:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Party"
    },
    election: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Election' 
    },
    state: String,
}, {
    timestamps:true
})


export default mongoose.model("Vote", voteSchema);

// in this voteSchema, this is when a voter wants to place a vote, on clicking on the candidate they want to vote for, 
// we pass that candidate id to this schema, then we also attach the type of election this vote is for, 
// the state the voter is voting form, we can also be fetched from the id of the user details
// so once a vote is cast, we can fetch all votes for a particular candidate, 
// we can fetch all vote for a particular state and use this for out svg map
// e.g all vote for a state e.g oyo state we attach to the map, and we can go further by dividing by parties