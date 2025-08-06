"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Loader2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import {nigerStates} from "@/constants"
import { useCreateCandidateMutation, useGetElectionsQuery, useGetPartiesQuery } from "@/redux/api/api"
import { toast } from "sonner"

const AddCandidate = () => {

    const [name, setName]= useState('')
    const [party, setParty]= useState('')
    const [election, setElection]= useState('')
    const [bio, setBio]= useState('')
    const [state, setState] = useState('');
    const [imageUrl, setImageUrl]= useState<File | null | string>(null);
    const [imageUrlPreview, setImageUrlPreview]= useState('')

    const {data:elections, }=useGetElectionsQuery(null)
    const {data:parties, }=useGetPartiesQuery(null)
    const [createCandidate, {isLoading, isSuccess, error}]=useCreateCandidateMutation()

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
        setImageUrlPreview(reader.result as string);
        setImageUrl(file); // store the File, not the base64 string
        };
        reader.readAsDataURL(file);
    }
    };

    useEffect(()=>{
      if(isSuccess){
          setName('')
          setParty('')
          setElection('')
          setBio('')
          setState('')
          setImageUrl(null)
          setImageUrlPreview('')
          toast.success("Candidate created successfully!");
        }
      if(error){
        console.error("Error creating election:", error);
      }
    },[isSuccess, error])


    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();   
      if (!imageUrl || typeof imageUrl === "string") {
        toast.error("Please upload an image.");
        return;
      }
    const formData = new FormData();
        formData.append('name', name);
        formData.append('party', party);
        formData.append('election', election);
        formData.append('bio', bio);
        formData.append('state', state);
        formData.append("imageUrl", imageUrl); // Ensure it's a File
        createCandidate(formData)
    }
    
  return (
    <Sheet>

        <SheetTrigger  className="w-full">
            <div className='bg-primary-foreground rounded-3xl flex items-center justify-center h-[250px] w-full'>
                <div className='flex flex-col items-center '>
                <Plus size={70} className='text-4xl text-blue-900 cursor-pointer' />
                <p className="text-sm text-neutral-600">Add New Candidate</p>
            </div>
        </div>
        </SheetTrigger >
        <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                 <SheetTitle className="text-3xl font-semibold">Register New Candidate?</SheetTitle>
                 <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
         <form className="px-6 overflow-auto" onSubmit={handleSubmit}>

        <div className="w-full max-h-[350px] overflow-y-auto sm:p-10">
         {imageUrlPreview && <div className="w-full h-[250px] sm:h-[240px]">
            <img className="w-full h-full object-cover rounded-xl" src={imageUrlPreview}/>
          </div>}
        </div>

            <div className="grid gap-4 ">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={bio} onChange={(e)=>setBio(e.target.value)} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="party">Party</Label>
                    <Select onValueChange={(value)=>setParty(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Election Type" />
                        </SelectTrigger>
                         <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Party</SelectLabel>
                                {parties?.map((party:any)=>(
                                    <SelectItem key={party._id} value={party._id}>{party.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* what sort of election =select, we are fetch all election for this, so to select it's id */}
                <div className="grid gap-3">
                    <Label htmlFor="election">Election</Label>
                    <Select onValueChange={(value)=>setElection(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Election Type" />
                        </SelectTrigger>
                         <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Election</SelectLabel>
                                {elections?.map((election:any)=>(
                                    <SelectItem value={election._id}>{election.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="state">State</Label>
                    <Select onValueChange={(value)=>setState(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                         <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Election</SelectLabel>
                                {nigerStates.map((state)=>(
                                    <SelectItem value={state}>{state}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="logo">Image</Label>
                    <Input type="file" id="imageUrl" name="imageUrl"  onChange={handleImage}/>
                </div>
            </div>
             <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-4">{isLoading ? <Loader2 className="animate-spin"/> :"Save changes"}</Button>
        </form>
        </SheetContent>
    </Sheet>
  )
}

export default AddCandidate
