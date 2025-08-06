"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useLoginMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    voterId: z.string().min(6, "Input valid Voter ID"),
})


const Login = () => {
    const router =useRouter()
    const [login, {isLoading, error, isSuccess}]=useLoginMutation()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
            voterId:"",
        }
    })

    const onSubmit =async (values: z.infer<typeof formSchema>)=>{
        console.log(values)
        try {
            const res = await login(values)
        } catch (error) {
             console.error('Login failed', error);
        }
    }

    useEffect(()=>{
        if(error){
            toast.error("Login failed: " + error!)
        }

        if(isSuccess){
            toast.success("Login successful")
            form.reset()
            router.push("/elections")
        }
    }, [isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl p-5 border border-neutral-300/20 rounded-xl">
        <h2 className="font-semibold text-2xl">Login Voter</h2>

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

            <Button type="submit" className="bg-green-600 hover:bg-green-700">{isLoading? <Loader2 className="animate-spin" /> :"Submit"}</Button>

            <p className="text-gray-500">Haven't registered? Click here to <Link href={"/register"} className="text-black underline">Register</Link></p>
      </form>
    </Form>
  )
}

export default Login
