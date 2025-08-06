import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const voterSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "Full name is required"],
    },
    lastName:{
        type:String,
        required:[true, "Last name is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    voterId: { 
        type: String, 
        required:[true, "VoterId is required"], 
    },
    phone: String,
    state: {
        type: String,
        required: [true, "Your State is required"],
    },
    hasVoted:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})


voterSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        // this means anytime the password changes, has the password
    }
    next()
})
voterSchema.pre("save", async function (next){
    if(this.isModified("voterId")){
        this.voterId = await bcrypt.hash(this.voterId, 10)
        // this means anytime the password changes, has the password
    }
    next()
})

voterSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

voterSchema.methods.compareVoterId = async function (enteredVoterId) {
    return await bcrypt.compare(enteredVoterId, this.voterId);
}

export default mongoose.model("Voter", voterSchema);
