import Vote from '../models/voteModel.js';
import voter from '../models/voterModel.js';

// to create a new vote => /api/vote/
export const newVote =async (req, res, next)=>{
    try {
        const newVote = new Vote({
            ...req.body,
            voter: req.user.id, // assuming req.user is populated with the authenticated user's data
            state: req.user.state, // assuming the user's state is stored in the user object

            // remember to validate that the candidate, party, and election IDs are valid before saving
            // you can also add additional validation logic here if needed
        });
        await newVote.save();

        // we need to also update the voter details, the voter hasVoted to true
        await voter.findByIdAndUpdate(req.user.id, { hasVoted: true });


        res.status(201).json({
            success: true,
            message: "New vote created successfully",
            newVote,
        });
    } catch (error) {
        next(error);
    }
}

// to fetch all votes => /api/vote/
export const getAllVotes = async (req, res, next) => {
    try {
        const votes = await Vote.find()
            .populate('voter', 'firstName lastName email state') // populate voter details
            .populate('candidate', 'name') // populate candidate details
            .populate('party', 'name') // populate party details
            .populate('election', 'name'); // populate election details

        res.status(200).json({
            success: true,
            message: "All votes fetched successfully",
            votes,
        });
    } catch (error) {
        next(error);
    }
}

// to fetch a single vote by ID => /api/vote/:id
export const getVoteById = async (req, res, next) => {
    try {
        const vote = await Vote.findById(req.params.id)
            .populate('voter', 'firstName lastName email state') // populate voter details
            .populate('candidate', 'name') // populate candidate details
            .populate('party', 'name') // populate party details
            .populate('election', 'name'); // populate election details

        if (!vote) {
            return res.status(404).json({
                success: false,
                message: "Vote not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vote fetched successfully",
            vote,
        });
    } catch (error) {
        next(error);
    }
}

// to delete a vote by ID => /api/vote/:id
export const deleteVote = async (req, res, next) => {
    try {
        const vote = await Vote.findByIdAndDelete(req.params.id);

        if (!vote) {
            return res.status(404).json({
                success: false,
                message: "Vote not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vote deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}

// to agregate votes by candidate, party, and state
export const aggregateVotes = async (req, res, next) => {
    try {
        const { candidateId, partyId, state } = req.query;

        const matchCriteria = {};
        if (candidateId) matchCriteria.candidate = candidateId;
        if (partyId) matchCriteria.party = partyId;
        if (state) matchCriteria.state = state;

        const votes = await Vote.aggregate([
            { $match: matchCriteria },
            {
                $group: {
                    _id: {
                        candidate: '$candidate',
                        party: '$party',
                        state: '$state',
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'candidates',
                    localField: '_id.candidate',
                    foreignField: '_id',
                    as: 'candidateDetails',
                },
            },
            {
                $lookup: {
                    from: 'parties',
                    localField: '_id.party',
                    foreignField: '_id',
                    as: 'partyDetails',
                },
            },
        ]);

        const totalCount = votes.length()

        res.status(200).json({
            success: true,
            message: "Votes aggregated successfully",
            totalCount,
        });
    } catch (error) {
        next(error);
    }
}


// to fetch a vote casted by a user => /api/votes/voter
export const getVoteByUser = async (req, res, next)=>{
    try {
        const vote = await Vote.findOne({ voter: req.user.id })
        .populate("voter", "firstName lastName email state")
            .populate("candidate", "name imageUrl party")
            .populate("party", "name logo acronym")
            .populate("election", "name type startDate endDate ");

        
        res.status(200).json(vote)
    } catch (error) {
        next(error)
    }
}

//to get votes per state => /api/votes/state
export const getVotesPerState = async (req, res) => {
  try {
    const stateResults = await Vote.aggregate([
      {
        $group: {
          _id: { state: "$state", candidate: "$candidate" },
          voteCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id.candidate",
          foreignField: "_id",
          as: "candidate"
        }
      },
      {
        $unwind: "$candidate"
      },
      {
        $lookup: {
          from: "parties",
          localField: "candidate.party",
          foreignField: "_id",
          as: "party"
        }
      },
      {
        $unwind: "$party"
      },
      {
        $group: {
          _id: "$_id.state",
          totalVotes: { $sum: "$voteCount" },
          candidates: {
            $push: {
              candidateName: "$candidate.name",
              partyName: "$party.name",
              partyColor: "$party.partyColor",
              partyAcronym: "$party.acronym",
              votes: "$voteCount"
            }
          }
        }
      },
      {
        $project: {
          state: "$_id",
          totalVotes: 1,
          candidates: 1,
          leadingCandidate: {
            $arrayElemAt: [
              {
                $slice: [
                  {
                    $sortArray: {
                      input: "$candidates",
                      sortBy: { votes: -1 }
                    }
                  },
                  1
                ]
              },
              0
            ]
          }
        }
      }
    ]);

    res.status(200).json(stateResults);
  } catch (error) {
    console.error("Error fetching state vote summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};