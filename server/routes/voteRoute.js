import express from 'express';
import { aggregateVotes, deleteVote, getAllVotes, getVoteById, getVoteByUser, getVotesPerState, newVote } from '../controllers/voteController.js';
import { verifyUser } from '../utils/verifyUser.js';


const router = express.Router();

router.post("/", verifyUser, newVote);
router.get("/",verifyUser, getAllVotes);
router.get("/voter",verifyUser, getVoteByUser);
router.get("/state-summary",verifyUser, getVotesPerState);
router.get("/aggregate",verifyUser, aggregateVotes);
router.get("/:id",verifyUser, getVoteById);
router.delete("/:id",verifyUser, deleteVote);



export default router;