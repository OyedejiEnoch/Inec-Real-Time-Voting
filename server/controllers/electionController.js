import Election from "../models/electionModel.js";


// to create a new election => /api/election/
export const newElection = async (req, res, next) => {
    try {
        const newElection = new Election(req.body);
        await newElection.save();

        res.status(201).json({
            success: true,
            message: "New election created successfully",
            newElection,
        });
    } catch (error) {
        next(error);
    }
}

// to fetch all elections => /api/election/
export const getAllElections = async (req, res, next) => {
    try {
        const allElections = await Election.find()
            .populate("parties", "name logo description acronym")
            .sort({ startDate: -1 });

            // With populate, we'll get: 
            // "parties": [
            //     {
            //         "name": "Democratic Party",
            //         "logo": "dem-logo.png",
            //         "description": "A major party...",
            //         "acronym": "DP"
            //     },
            //     ...
            //  ]
            // i.e instead of getting just the id's we'll get the properties in them and we can say the properties we want
            // e.g we can only want the nane of each party

        res.status(200).json(allElections);

    } catch (error) {
        next(error);
    }
}

// to get a single election => /api/election/:id
export const singleElection =async(req, res, next)=>{
    try {
        const election =await Election.findById(req.params.id)
         .populate({
        path: "parties",
        select: "name logo description acronym",
      })
      .populate({
        path: "candidates",
        select: "name party imageUrl",
        populate: {
          path: "party", // if candidate has a party field that's a ref
          select: "name acronym logo",
        },
      });
        if(!election){
            return next(createError(404, "Election not found"));
        }
        res.status(200).json(election);
    } catch (error) {
        next(error)
    }
}

// to update an election => /api/election/:id
export const updateElection = async (req, res, next) => {
    const { parties, ...rest } = req.body;
    try {
        const election = await Election.findByIdAndUpdate(req.params.id, {
            rest,
            $push: {parties:{$each: parties} }
        }, {
            new: true,
            runValidators: true,
        });

        if (!election) {
            return next(createError(404, "Election not found"));
        }

        res.status(200).json({
            success: true,
            message: "Election updated successfully",
            election,
        });
    } catch (error) {
        next(error);
    }
}

// to delete an election => /api/election/:id
export const deleteElection = async (req, res, next) => {
    try {
        const election = await Election.findByIdAndDelete(req.params.id);
        if (!election) {
            return next(createError(404, "Election not found"));
        }

        res.status(200).json({
            success: true,
            message: "Election deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}