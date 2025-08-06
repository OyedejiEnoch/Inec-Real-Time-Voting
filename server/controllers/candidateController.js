import Candidate from "../models/candidateModel.js";
import Party from "../models/partyModel.js";
import Election from "../models/electionModel.js";
import { createError } from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

// to create a new candidate => /api/candidate/
export const newCandidate = async (req, res, next) => {
    try {

        if(!req.file){
            return next(createError(400, "Please upload an image"));
        }        
        if(req.file){
            const {secure_url, public_id}=await cloudinary.uploader.upload(
                req.file.path,
                {
                folder: "inec",
                }
            );

            req.body.imageUrl = { url: secure_url, public_id: public_id };
        }

        const newCandidate = new Candidate(req.body);
        await newCandidate.save();

        // to push the candidate to the party's candidates array
        await Party.findByIdAndUpdate(
            req.body.party,
            {
                $push: { candidates: newCandidate._id },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        // to push the candidate to the elections's candidates array i.e what election is this candidate running for
        await Election.findByIdAndUpdate(
            req.body.election,
            {
                $push: { candidates: newCandidate._id },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(201).json({
            success: true,
            message: "New candidate created successfully",
            newCandidate,
        });
    } catch (error) {
        next(error);
    }
}

// to fetch all candidates => /api/candidate/
export const getAllCandidates = async (req, res, next) => {
    try {
        const allCandidates = await Candidate.find()
            .populate("party", "name logo")
            .populate("election", "name type");
        
        res.status(200).json(allCandidates);
    } catch (error) {
        next(error)
    }
}

// to fetch a single candidate => /api/candidate/:id
export const singleCandidate =async(req, res, next)=>{
    try {
        const candidate =await Candidate.findById(req.params.id)
        .populate({
        path: "party",
        select: "_id name logo description acronym",
      })
      .populate({
        path: "election",
        select: "_id name type",
      })

        if(!candidate) {
            return next(createError(404, "Candidate not found"));
        }

        res.status(200).json({
            success: true,
            candidate,
        });
    } catch (error) {
        next(error)
    }
}

// to update a candidate => /api/candidate/:id
export const updateCandidate = async (req, res, next) => {
    try {
        const updateCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        } )

        if (!updateCandidate) {
            return next(createError(404, "Candidate not found"));
        }
        res.status(200).json({
            success: true,
            message: "Candidate updated successfully",
            updateCandidate,
        });
    } catch (error) {
        next(error);
    }
}

// to delete a candidate => /api/candidate/:id
export const deleteCandidate = async (req, res, next) => {
    try {
        const deleteCandidate = await Candidate.findByIdAndDelete(req.params.id);

        if (!deleteCandidate) {
            return next(createError(404, "Candidate not found"));
        }

        // Remove candidate from party's candidates array
        await Party.findByIdAndUpdate(
            // remember we are attaching the party to the candidate when creating a candidate
            deleteCandidate.party,
            {
                $pull: { candidates: deleteCandidate._id },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        // Remove candidate from election's candidates array
        await Election.findByIdAndUpdate(
            deleteCandidate.election,
            {
                $pull: { candidates: deleteCandidate._id },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Candidate deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}