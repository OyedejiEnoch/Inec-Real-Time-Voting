import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Election name is required"],
        unique: true,
    },
    type:{
        type:String,
        required: [true, "Election type is required"],
        enum: ["Presidential", "Governorship", "Local Government", "Senatorial"],
    },
    description: {
        type: String,
        required: [true, "Election description is required"],
    },
    state:{
        type:String
    },
    startDate: {
        type: Date,
        required: [true, "Election start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "Election end date is required"],
    },
    parties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party",
    }],
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
    }],
    status:{
        type:String,
        enum: ['Upcoming', 'Ongoing', 'Ended'],
        default: 'Upcoming',
    }
}, {
    timestamps: true,
});


export default mongoose.model("Election", electionSchema)