import express from "express"
import { deleteCandidate, getAllCandidates, newCandidate, singleCandidate, updateCandidate } from "../controllers/candidateController.js"
import { verifyUser } from "../utils/verifyUser.js";
import { uploadImage } from "../middleware/multer.js";

const router = express.Router()

router.post("/",verifyUser,  uploadImage.single("imageUrl"), newCandidate);
router.get("/", verifyUser,getAllCandidates);
router.get("/:id", verifyUser, singleCandidate);
router.put("/:id",verifyUser, updateCandidate);
router.delete("/:id",verifyUser, deleteCandidate);

export default router