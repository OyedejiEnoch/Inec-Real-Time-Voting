import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


type Candidate={
     _id:string,
    name:string,
    imageUrl:string,
    bio:string,
    party:{
      _id:string,
      name:string,
      logo:string
    },
    election:{
      _id:string,
      name:string
    },
    state:string,
}

type VoteDetails ={
    _id:string,
    voter:{
        _id:string
        firstName:string,
        lastName:string,
        email:string,
        state:string
    },
    candidate:{
        name:string,
        party:string,
        imageUrl:{
            url:string
        }
    },
    election:{
        name:string,
        type:string,
        startDate:string,
        endDate:string
    },
    state:string,
    party:{
        logo:{
            url:string
        },
        name:string,
        acronym:string
    }

}
type Vote ={
    candidate:string,
    election:string,
    party:string
}

 interface UserDetails {
    _id:string,
    firstName:string,
    lastName:string;
    email: string;
    phone:string;
    state:string
    hasVoted:boolean
}

export const api =createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://inec-real-time-voting.onrender.com', credentials: 'include' }),
    tagTypes: ['Party', 'Election', 'Candidate', 'Vote'], // Example tag types

    endpoints: (builder) => ({
        // Define your endpoints here
        // all parties
        getParties: builder.query({
            query: () => '/api/party',
            providesTags: ['Party'], // Tag for invalidation
        }),
        createParty:builder.mutation({
            query:(newParty)=>({
                url:'/api/party',
                method:'POST',
                body:newParty
            }),
            invalidatesTags: ['Party'], // Invalidate the Party tag after creation
        }),
        updateParty: builder.mutation({
            query: ({ id, ...updatedParty }) => ({
                url: `/api/party/${id}`,
                method: 'PUT',
                body: updatedParty,
            }),
            invalidatesTags:["Party"]
        }),
        deleteParty: builder.mutation({
            query: (id) => ({
                url: `/api/party/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Party'], // Invalidate the Party tag after deletion
        }),

        // all elections 
        getElections: builder.query({
            query:()=> '/api/election',
            providesTags: ['Election'], // Tag for invalidation
        }),
        getSingleElection: builder.query({
            query: (id) => `/api/election/${id}`,
            providesTags: ['Election'], // Tag for invalidation
        }),
        createElection: builder.mutation({
            query: (newElection) => ({
                url: '/api/election',
                method: 'POST',
                body: newElection,
            }),
            invalidatesTags: ['Election'], // Invalidate the Election tag after creation
        }),
        updateElection: builder.mutation({
            query: ({ id, ...updatedElection }) => ({
                url: `/api/election/${id}`,
                method: 'PUT',
                body: updatedElection,
            }),
            invalidatesTags: ['Election'],
        }),
        deleteElection: builder.mutation({
            query: (id) => ({
                url: `/api/election/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Election'], // Invalidate the Election tag after deletion
        }),

        // candidates
        getCandidates: builder.query({
            query:()=> '/api/candidate',
            providesTags: ['Candidate'], // Tag for invalidation
        }),
        createCandidate: builder.mutation({
            query: (newCandidate) => ({
                url: '/api/candidate',
                method: 'POST',
                body: newCandidate,
            }),
            invalidatesTags: ['Candidate'], // Invalidate the Candidate tag after creation
        }),
        getCandidateById: builder.query({
            query: (id) => `/api/candidate/${id}`,
            providesTags: ['Candidate'], // Tag for invalidation
        }),
        updateCandidate: builder.mutation({
            query: ({ id, ...updatedCandidate }) => ({
                url: `/api/candidate/${id}`,
                method: 'PUT',
                body: updatedCandidate,
            }),
            invalidatesTags: ['Candidate'],
        }),
        deleteCandidate: builder.mutation({
            query: (id) => ({
                url: `/api/candidate/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Candidate'], // Invalidate the Candidate tag after deletion
        }),

        // votes
        getVotes: builder.query({
            query: () => '/api/vote',
            providesTags: ['Vote'], // Tag for invalidation
        }),
        createVote: builder.mutation<VoteDetails, Vote>({
            query: (newVote) => ({
                url: '/api/vote',
                method: 'POST',
                body: newVote,
            }),
            invalidatesTags: ['Vote'], // Invalidate the Vote tag after creation
        }),
        getVoteByVoter: builder.query<VoteDetails, null>({
            query: () => `/api/vote/voter`
        }),
        getVoteById: builder.query({
            query: (id) => `/api/vote/${id}`,
            providesTags: ['Vote'], // Tag for invalidation
        }),
        updateVote: builder.mutation({
            query: ({ id, ...updatedVote }) => ({
                url: `/api/vote/${id}`,
                method: 'PUT',
                body: updatedVote,
            }),
            invalidatesTags: ['Vote'],
        }),
        deleteVote: builder.mutation({
            query: (id) => ({
                url: `/api/vote/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vote'], // Invalidate the Vote tag after deletion
        }),
        getVotesPerState: builder.query<any[], void>({
            query: () => '/api/vote/state-summary',
        }),

        //all voters
        getAllVoters: builder.query<UserDetails, void>({
            query: ()=> '/api/user/voters'
        })
    }),
})

export const {
    useGetPartiesQuery,
    useCreatePartyMutation,
    useUpdatePartyMutation,
    useDeletePartyMutation,
    useGetElectionsQuery,
    useGetSingleElectionQuery,
    useCreateElectionMutation,
    useUpdateElectionMutation,
    useDeleteElectionMutation,
    useGetCandidatesQuery,
    useCreateCandidateMutation,
    useGetCandidateByIdQuery,
    useUpdateCandidateMutation,
    useDeleteCandidateMutation,
    useGetVotesQuery,
    useCreateVoteMutation,
    useGetVoteByVoterQuery,
    useGetVoteByIdQuery,
    useUpdateVoteMutation,
    useDeleteVoteMutation,
    useGetVotesPerStateQuery,
    useGetAllVotersQuery
} = api;

export default api;