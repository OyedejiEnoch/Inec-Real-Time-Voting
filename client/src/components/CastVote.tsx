"use client"
 
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, Loader2 } from "lucide-react"
import { useUserProfileQuery } from "@/redux/api/userApi"
import { useCreateVoteMutation } from "@/redux/api/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Prop={
  candidate:{
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
}

const CastVote = ({candidate}:Prop) => {

  const router =useRouter()
  // we get the details of the logged in user, so we get the id, and the state the user is voting from
  const {data:user}=useUserProfileQuery(null)
  console.log("This is the candidate id",candidate._id)
  console.log("This is the candidate party id",candidate.party._id)
  console.log("This is the candidate election id",candidate.election._id)
  console.log("This is the user id",user?._id)
  console.log("This is the user state",user?.state)


  const [createVote, {isLoading, isSuccess, error}]=useCreateVoteMutation()

  React.useEffect(()=>{
    if(isSuccess){
      toast.success("Vote Created")
      router.push("/vote-success")
    }
    if(error){
      toast.error("Vote not created")
    }
  },[isSuccess])

  const handleSubmit =(e: React.FormEvent)=>{
    e.preventDefault()
    createVote({
      candidate:candidate._id,
      party:candidate.party._id,
      election:candidate.election._id,
    })
    // we are not passing the voterId and state, because we are receiving it on the backend already
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center">
            <button className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200
                flex items-center gap-4 bg-green-600 text-white hover:bg-green-700 hover:text-white"><CheckCircle /> Vote</button>
        </div>
      </DialogTrigger>
      <DialogContent>
         <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
                Are You Sure you want to cast your vote?
            </DialogTitle>
                <form onSubmit={handleSubmit} className="flex justify-center items-center mt-6">
                            <button type="submit" className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200
                        flex items-center gap-4 bg-green-600 text-white hover:bg-black hover:text-white"><CheckCircle /> {isLoading? <Loader2 className="animate-spin" /> :"Vote"}</button>
                </form>

         </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CastVote
