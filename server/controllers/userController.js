import Voter from "../models/voterModel.js"

export const getUserProfile = async (req, res, next) => {
  try {
    // req.user.id this is coming from verify user
    const userDetails = await Voter.findById(req.user.id);

    if (!userDetails) {
      return next(createError(403, "You are not authenticated"));
    }

    res.status(200).json({
      success: true,
      userDetails,
    });
  } catch (error) {}
};

// TO GET all voters =>/api/voters/

export const getAllVoters  =async(req, res, next)=>{
  try {
      const voters = await Voter.find()

      res.status(200).json(voters)
  } catch (error) {
    next(error)
  }
}