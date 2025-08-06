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
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { useCreatePartyMutation } from "@/redux/api/api"
import { toast } from "sonner"
const AddNewParty = () => {

  const [createParty, {isLoading, isSuccess, error}]=useCreatePartyMutation()

  const [name, setName]= useState('')
  const [description, setDescription]= useState('')
  const [partyColor, setPartyColor]= useState('')
  const [acronym, setAcronym]= useState('')
  const [logo, setLogo] = useState<File | null | string>(null);
  const [logoPreview, setLogoPreview]= useState('')

const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
      setLogo(file); // store the File, not the base64 string
    };
    reader.readAsDataURL(file);
  }
};

useEffect(()=>{
  if(isSuccess){
      setName('')
      setDescription('')
      setPartyColor('')
      setAcronym('')
      setLogoPreview('')
      setLogo(null)
      toast.success("Party created successfully!");
    }
  if(error){
    console.error("Error creating election:", error);
  }
},[isSuccess, error])

const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   
  if (!logo || typeof logo === "string") {
    toast.error("Please upload an image.");
    return;
  }

    const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('partyColor', partyColor);
  formData.append('acronym', acronym);
  formData.append("logo", logo); // Ensure it's a File

    console.log(formData)
  createParty(formData)
}

  return (
    <Sheet>
      <SheetTrigger  className="w-full">
         <span className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200
            flex items-center gap-4 hover:bg-black hover:text-white text-xs md:text-sm"><Plus /> New Politcial</span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                 <SheetTitle className="text-3xl font-semibold">Create New Political Party?</SheetTitle>
                 <SheetDescription>
                    This action is to create a new political party.
                </SheetDescription>
            </SheetHeader>
             <form className="px-6 overflow-auto" onSubmit={handleSubmit}>

              <div className="w-full max-h-[350px] overflow-y-auto sm:p-10">
         {logoPreview && <div className="w-full h-[250px] sm:h-[240px] ">
            <img className="w-full h-full object-cover rounded-xl" src={logoPreview}/>
          </div>}
          </div>

            <div className="grid gap-4 ">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name of Political Party</Label>
                    <Input id="name" name="name" value={name}  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="partyColor">Party Color</Label>
                    <Input id="partyColor" name="partyColor" value={partyColor} onChange={(e)=>setPartyColor(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="acronym">Acronym</Label>
                    <Textarea id="acronym" name="acronym"onChange={(e)=>setAcronym(e.target.value)} value={acronym} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="logo">Logo</Label>
                    <Input type="file" id="logo" name="logo"  onChange={handleImage}/>
                </div>
                {/* we need to first create a party, before even creating a candidate, because when we create a candidate we would have to
                attach a party to it */}
            </div>
             <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-4">{isLoading ? <Loader2  className="animate-spin"/>  : "Create Party "}</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default AddNewParty
