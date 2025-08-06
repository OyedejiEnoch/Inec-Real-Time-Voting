'use client'
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
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import "react-datepicker/dist/react-datepicker.css";
import { useCreateElectionMutation } from "@/redux/api/api";
import { toast } from "sonner";
import { nigerStates } from "@/constants"

const AddElection = () => {
    const [createElection, { isLoading , isSuccess, error}] =useCreateElectionMutation()
     const [openStart, setOpenStart] = useState(false)
     const [openEnd, setOpenEnd] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const [values, setValues] = useState({
    name: "",
    type: "",
    description: "",
    status: "",
    state:''

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if(isSuccess){
            setValues({
                name: "",
                type: "",
                description: "",
                status: "",
                state:''
            })
            setStartDate(undefined)
            setEndDate(undefined)
            setOpenStart(false)
            setOpenEnd(false)
            toast.success("Election created successfully!");
        }
        if(error){
            console.error("Error creating election:", error);
        }
    },[isSuccess])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        createElection({...values, startDate, endDate})
    };

  return (
 <Sheet>
      <SheetTrigger  className="w-full">
         <span className="px-4 py-3 rounded-xl border border-neutral-400/20 transition duration-200
            flex items-center gap-4 hover:bg-black hover:text-white text-sm font-semibold"><Plus /> Create Election</span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[500px]">
            <SheetHeader>
                 <SheetTitle className="text-2xl md:text-3xl font-semibold">Create New Election?</SheetTitle>
                 <SheetDescription>
                    This action is to create a new election party.
                </SheetDescription>
            </SheetHeader>
             <form className="px-6" onSubmit={handleSubmit}>

            <div className="grid gap-4 ">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name of Election</Label>
                    <Input id="name" name="name" onChange={handleChange} value={values.name}/>
                </div>
                 <div className="grid gap-3">
                    <Label htmlFor="type">Type of Election</Label>
                    <Select onValueChange={(value) => setValues({ ...values, type: value })}>
                         <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select an election" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Election</SelectLabel>
                                 <SelectItem value="Presidential">Presidential</SelectItem>
                                 <SelectItem value="Governorship">Governorship</SelectItem>
                                 <SelectItem value="Senatorial">Senatorial</SelectItem>
                                 <SelectItem value="Local Government">Local Government</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" onChange={handleChange} value={values.description} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(value) => setValues({ ...values, status: value })}>
                         <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>status</SelectLabel>
                                 <SelectItem value="Upcoming">Upcoming</SelectItem>
                                 <SelectItem value="Ongoing">Ongoing</SelectItem>
                                 <SelectItem value="Ended">Ended</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="state">State</Label>
                        <Select  onValueChange={(value) => setValues({ ...values, state: value })}>
                            <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectLabel>State</SelectLabel>
                        <SelectItem value={'General'}>General</SelectItem>
                                {nigerStates.map((state)=>(
                            <SelectItem value={state}>{state}</SelectItem>
                        ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                 </div>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="startDate" className="px-1">Start Date</Label>

                         <Popover open={openStart} onOpenChange={setOpenStart} >
                             <PopoverTrigger asChild>
                                <Button variant="outline" id="startDate"  className="w-48 justify-between font-normal">
                                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                                </Button>
                             </PopoverTrigger>
                             <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={startDate}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                    setStartDate(date)
                                    setOpenStart(false)
                                    
                                    }}
                                />
                             </PopoverContent>
                         </Popover>
                    </div>

                    <div className="flex flex-col gap-4">
                         <Label htmlFor="startDate" className="px-1">End Date</Label>

                         <Popover open={openEnd} onOpenChange={setOpenEnd} >
                             <PopoverTrigger asChild>
                                <Button variant="outline" id="startDate"  className="w-48 justify-between font-normal">
                                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                                </Button>
                             </PopoverTrigger>
                             <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={endDate}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                    setEndDate(date)
                                    setOpenEnd(false)
                                    
                                    }}
                                />
                             </PopoverContent>
                         </Popover>
                    </div>
                </div>


            </div>
             <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-4">{isLoading ? <Loader2 className="animate-spin" /> : "Create Election"}</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default AddElection
