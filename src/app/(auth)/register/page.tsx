"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { handleRegister } from "@/actions/register"
import { useState } from "react"
import { generateOtp } from "@/actions/generate-otp"
import { verifyOtp } from "@/actions/verify-otp"

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  otp: z.string().min(4, {
    message: "Password must be at least 2 characters.",
  }),
})

function RegisterForm() {
  const [isOtpGenerated, setIsOtpGenerated] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: ""
    },
  })

  // Function to generate OTP
  const handleGenerateOtp = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Please enter an email"}</code>
          </pre>
        ),
      });
      return;
    }

    try {
      const res = await generateOtp(email);
      console.log(res)
      setIsOtpGenerated(true);
      toast({
        title: "OTP Sent",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"OTP has been sent to your email"}</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{(error as Error).message}</code>
          </pre>
        ),
      });
    }
  };


  const handleVerifyOtp = async () => {
    const { email, otp } = form.getValues();

    if (!otp) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Please enter the OTP"}</code>
          </pre>
        ),
      });
      return;
    }

    try {
     const res =  await verifyOtp({ email, otp })
     console.log(res)
      setIsOtpVerified(true)
      
    } catch (error) {
      throw new Error("Error in veriy opt")
    }
  }


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isOtpVerified) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Please verify OTP first"}</code>
          </pre>
        ),
      });
      return;
    }

    try {
      const res = await handleRegister(data);
      console.log(res);
      toast({
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{"Registration successful"}</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{(error as Error).message}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your email to receive the OTP.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={handleGenerateOtp} disabled={isOtpGenerated}>
          {isOtpGenerated ? "OTP Sent" : "Send OTP"}
        </Button>
        {isOtpGenerated && (
          <>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleVerifyOtp} disabled={isOtpVerified}>
              {isOtpVerified ? "OTP Verified" : "Verify OTP"}
            </Button>
          </>
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription>
                Please enter a strong password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isOtpGenerated || !isOtpVerified}>
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm;
