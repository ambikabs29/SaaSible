"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
   const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    setEmailSent(false); // Reset email sent state on new submission
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox (and spam folder) for instructions to reset your password.",
      });
      setEmailSent(true); // Indicate email has been sent
      form.reset(); // Clear the form
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
       let description = "An unexpected error occurred. Please try again.";
       if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
         // Don't reveal if the user exists or not for security
         description = "If an account exists for this email, a password reset link has been sent.";
          toast({ title: "Password Reset Request Received", description });
           setEmailSent(true); // Still indicate success to avoid user enumeration
       } else {
         toast({ variant: "destructive", title: "Error Sending Reset Email", description });
       }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>Enter your email address below to receive password reset instructions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {emailSent && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    If an account exists for this email, a password reset link has been sent. Please check your inbox.
                  </p>
                )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          Remembered your password?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
