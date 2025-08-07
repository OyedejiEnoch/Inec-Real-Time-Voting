"use client"
 
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { CheckCircle, Loader2 } from "lucide-react"
import CastVote from "./CastVote"
import { useGetCandidateByIdQuery } from "@/redux/api/api"

const VoteCandidate = ({id}:{id:number}) => {

    // i passed the candidate id, from the elections candidate array, remember we stored each candidate id, in an array for the election
    const {data:result, isLoading,}=useGetCandidateByIdQuery(id) //we fetch the details of each candidate
    const candidate =result?.candidate
    console.log(candidate) //inside we have the party this candidate is attached to and the election, we need this for the voting

    if(isLoading){
    return <div className='flex items-center justify-center h-screen'>{<Loader2 className='animate-spin' />}</div>
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <span className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200
            flex items-center gap-4 hover:bg-black hover:text-white cursor-pointer"><CheckCircle /> Vote</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">{candidate?.name}</DialogTitle>
            </DialogHeader>
                <div className='border border-gray-400/20 rounded-2xl shadow p-1 flex justify-center items-center'>
                    <Image src={candidate?.imageUrl?.url} alt='candidate-image' className='object-cover rounded-2xl' width={350} height={250} />
                </div>
                    <div className='flex items-center flex-col mt-4 gap-4'>
                    <Image src={candidate?.party?.logo?.url} alt='party-image' className='h-[50px] w-[50px] object-cover' width={100} height={100} />
                    <p className="text-sm text-gray-400">{candidate?.bio}</p> 
                </div>
            <CastVote candidate ={candidate} /> 
        </DialogContent>
    </Dialog>
  )
}
//we should pass the detaails of the candidate into the cast vote
export default VoteCandidate


    //   am5map.MapChart.new(root, {
    //     panX: "rotateX",
    //     panY: "none",
    //     wheelY: "zoom",
    //     projection: am5map.geoMercator(),
    //   })