import express from "express";
import { deleteElectoralParty, getAllElectoralParty, newElectoralParty, updateElectoralParty } from "../controllers/partyController.js";
import { verifyUser } from "../utils/verifyUser.js";
import { uploadImage } from "../middleware/multer.js";

const router =express.Router()

router.post("/",verifyUser, uploadImage.single("logo"), newElectoralParty);
router.get("/", verifyUser,getAllElectoralParty);
router.put("/:id",verifyUser, updateElectoralParty);
router.delete("/:id",verifyUser, deleteElectoralParty);


export default router