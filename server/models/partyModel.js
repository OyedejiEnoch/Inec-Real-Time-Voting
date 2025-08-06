import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Party name is required"],
        unique: true,
    },
    logo: {
        url: String,
        public_id: String
    },
    description: {
        type: String,
    },
    partyColor: {
        type: String,
    },
    acronym: String,
    // we need to first create a party, before even creating a candidate, because when we create a candidate we would have to attach a party to it
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
    }],
}, {
    timestamps: true,
})


export default mongoose.model("Party", partySchema);
// Compare this snippet from server/models/candidateModel.js: