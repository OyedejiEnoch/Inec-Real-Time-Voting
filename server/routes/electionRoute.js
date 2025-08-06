import express from "express"
import { deleteElection, getAllElections, newElection, singleElection, updateElection } from "../controllers/electionController.js"
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router()

router.post("/",verifyUser, newElection);
router.get("/", verifyUser,getAllElections);
router.get('/:id', verifyUser, singleElection);
router.put("/:id", verifyUser,updateElection);
router.delete("/", verifyUser, deleteElection);



export default router