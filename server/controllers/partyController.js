import Party from "../models/partyModel.js";
import { createError } from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";


// to create a new electoralParty => /api/party/
export const newElectoralParty =async (req, res, next)=>{
    try {
        // check if the party already exists
        const existingParty = await Party.findOne({ name: req.body.name });
        if (existingParty) {
            return next(createError(400, "Electoral party already exists"));
        }

        if(!req.file){
            return next(createError(400, "Please upload a logo"));
        }

        if(req.file){
            const {secure_url, public_id}=await cloudinary.uploader.upload(
                req.file.path,  
                {
                folder: "inec",
                }
            );

            req.body.logo = { url: secure_url, public_id: public_id };
        }

        const newElectoralParty = new Party(req.body)

        await newElectoralParty.save()

        res.status(201).json({
            success:true,
            message:"New Electoral party created successfully",
            newElectoralParty
        });

    } catch (error) {
        next(error)
    }
}

// to fetch all registered electoral parities  => /api/party/
export const getAllElectoralParty =async(req, res, next)=>{
    try {
        const allElectoralParty =await Party.find()


        res.status(200).json(allElectoralParty)
    } catch (error) {
        next(error)
    }
}

// to update an electoral party =>/api/party/

export const updateElectoralParty =async (req, res, next)=>{
    try {
        const electoralParty = await Party.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!electoralParty) {
            return next(createError(404, "Electoral party not found"));
        }

        res.status(200).json({
            success: true,
            message: "Electoral party updated successfully",
            electoralParty,
        });
    } catch (error) {
        next(error);
    }
}

// to delete an electoral party => /api/party/:id
export const deleteElectoralParty =async (req, res, next)=>{
    try {
        const electoralParty = await Party.findByIdAndDelete(req.params.id);

        if (!electoralParty) {
            return next(createError(404, "Electoral party not found"));
        }

        res.status(200).json({
            success: true,
            message: "Electoral party deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}