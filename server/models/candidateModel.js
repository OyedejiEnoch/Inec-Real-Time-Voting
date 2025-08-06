import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Candidate name is required"],
    },
    party:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Party"
    },
    election:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Election"
    },
    bio:{
        type:String
    },
    state:{
        type:String
    },
    imageUrl:{
        url: String,
        public_id: String
    },

}, {
    timestamps:true
})


export default mongoose.model("Candidate", candidateSchema)

// we need the name of the candidate, the party of the candidate, the type of election, and the state & bio of the candidate
// and we fetch the party from the list of parties to attach to the candidate,
// we fetch the list of elections to know which type of election he is going for,
// on attaching the election, we also push the candidate to an array in the election list to show the candidates that are running for the election
// then same as the parties too, after attatching the party we also push the candidate to the array in the party showing list of candidates in a party 