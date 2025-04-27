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
import { Github, Mail } from "lucide-react";
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState< 'google' | 'github' | null>(null);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
     setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error: any) {
      console.error("Login Error:", error);
      let description = "Invalid email or password. Please try again.";
       if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
         description = "Invalid email or password.";
       } else if (error.code === 'auth/too-many-requests') {
         description = "Access temporarily disabled due to too many failed login attempts. Please reset your password or try again later.";
       } else {
         description = "An unexpected error occurred. Please try again.";
       }
      toast({ variant: "destructive", title: "Login Failed", description });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = (provider: GoogleAuthProvider | GithubAuthProvider, providerName: 'google' | 'github') => async () => {
     setSocialLoading(providerName);
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Signed In", description: `Successfully signed in with ${providerName === 'google' ? 'Google' : 'GitHub'}.` });
      router.push('/dashboard'); // Redirect to dashboard after sign in
    } catch (error: any) {
       console.error("Error signing in:", error);
        let description = "Could not sign you in. Please try again.";
        if (error.code === 'auth/account-exists-with-different-credential') {
          description = "An account already exists with the same email address but different sign-in credentials. Try signing in using a different provider.";
        } else if (error.code === 'auth/popup-closed-by-user') {
            description = `Sign-in with ${providerName === 'google' ? 'Google' : 'GitHub'} was cancelled.`; // Refined message
            toast({ variant: "default", title: "Sign In Cancelled", description });
            setSocialLoading(null); // Reset loading state immediately for cancellation
            return; // Exit early
        }
       toast({ variant: "destructive", title: "Sign In Failed", description });
    } finally {
       setSocialLoading(null);
    }
   };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary via-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
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
                      <Input placeholder="m@example.com" {...field} disabled={loading || !!socialLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                     <div className="flex items-center justify-between">
                       <FormLabel>Password</FormLabel>
                       <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                         Forgot password?
                       </Link>
                     </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={loading || !!socialLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading || !!socialLoading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleSocialSignIn(googleProvider, 'google')} disabled={loading || !!socialLoading}>
               {socialLoading === 'google' ? "Signing in..." : (
                <>
                {/* Inline SVG for Google icon */}
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l0.001-0.001l6.19,5.238C39.782,36.49,44,30.911,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                 Google
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleSocialSignIn(githubProvider, 'github')} disabled={loading || !!socialLoading}>
              {socialLoading === 'github' ? "Signing in..." : (
                 <>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                 </>
               )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
