"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRegisterMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "First name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    voterId: z.string().min(6, "Input valid Voter ID"),
    phone: z.string().min(11, "Input valid phone number"),
    state: z.string().min(1, "State is required"),
})

const Register = () => {
    const router =useRouter()
    const [phase, setPhase]=useState("firstPhase")
    const [register, {isLoading, error, isSuccess}] =useRegisterMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            voterId:"",
            phone:"",
            state:""
        }
    })

    const onSubmit =async (values: z.infer<typeof formSchema>)=>{
            try {
                const res = await register(values)
            } catch (error) {
                 console.error('Login failed', error);
                 toast.error("Registration failed")
            }
    }

    useEffect(()=>{
        if(error){
        toast.error("Register failed: " + error!)
        }
    
        if(isSuccess){
        toast.success("Registered successful")
        form.reset()
        router.push("/elections")
    }
    }, [isSuccess])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl p-5 border border-neutral-300/40 rounded-xl">
            <h2 className="font-semibold text-2xl">Register Voter</h2>
            { phase === "firstPhase" && <><FormField 
                control={form.control}
                name="firstName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                         <FormControl>
                            <Input placeholder="firstname" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="lastName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                         <FormControl>
                            <Input placeholder="lastname" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="password"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            </> }
            {phase === "secondPhase" && <>
            <FormField 
                control={form.control}
                name="voterId"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Voter Id</FormLabel>
                         <FormControl>
                            <Input placeholder="voterId" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                    control={form.control}
                    name="phone"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Phone No</FormLabel>
                            <FormControl>
                                <Input placeholder="phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="state"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="state" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            </> }
            
            {phase === "firstPhase" ? <Button onClick={()=>setPhase("secondPhase")} className="bg-green-600 hover:bg-green-700">Next</Button> :
            <div className="flex items-center gap-4">
                <Button onClick={()=>setPhase("firstPhase")}>Back</Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">{isLoading? <Loader2 className="animate-spin" /> :"Submit"}</Button>
            </div>
            
            }
            
            <p className="text-gray-500">Already registered? Click here to <Link href={"/login"} className="text-black underline">Login</Link></p>
        </form>
    </Form>
  )
}

export default Register
