"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, User, Settings, LayoutDashboard, Github, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/'); // Redirect to homepage after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ variant: "destructive", title: "Sign Out Failed", description: "Could not sign you out. Please try again." });
    }
  };

   const handleSignIn = (provider: GoogleAuthProvider | GithubAuthProvider, providerName: 'google' | 'github') => async () => {
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Signed In", description: `Successfully signed in with ${providerName === 'google' ? 'Google' : 'GitHub'}.` });
      router.push('/dashboard'); // Redirect to dashboard after sign in
    } catch (error: any) {
       let description = "Could not sign you in. Please try again.";
        // Handle specific errors like account exists with different credential
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.error(`Error signing in with ${providerName}:`, error);
          description = "An account already exists with the same email address but different sign-in credentials. Try signing in using a different provider.";
           toast({ variant: "destructive", title: "Sign In Failed", description });
        } else if (error.code === 'auth/popup-closed-by-user') {
            console.log(`Sign-in with ${providerName} cancelled by user (popup closed) - from header.`); // Specific log
            description = `Sign-in with ${providerName === 'google' ? 'Google' : 'GitHub'} was cancelled.`; // Specific message
            toast({ variant: "default", title: "Sign In Cancelled", description }); // Use default variant
            return; // Exit early
        } else if (error.code === 'auth/unauthorized-domain') {
             console.error(`Error signing in with ${providerName}:`, error);
             description = "This domain is not authorized for OAuth operations. Please check Firebase console settings.";
              toast({ variant: "destructive", title: "Configuration Error", description });
        } else {
             console.error(`Error signing in with ${providerName}:`, error);
             toast({ variant: "destructive", title: "Sign In Failed", description });
        }
    }
   };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Function to get initials from user's display name or email
  const getInitials = (name: string | null | undefined, email: string | null | undefined): string => {
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U"; // Default fallback
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           {/* Replace with a proper logo/icon if available */}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
             <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>
           </svg>
          <span className="font-bold sm:inline-block">SaaSible</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {/* Add navigation links here if needed */}
          {/* <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</Link> */}
          {/* <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link> */}
           <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
           <Link href="/apps" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Apps</Link>
        </nav>
        <div className="flex items-center space-x-2">
          {loading ? (
             <Avatar className="h-8 w-8">
               <AvatarFallback>?</AvatarFallback>
             </Avatar>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? user.email ?? "User"} />
                    <AvatarFallback>{getInitials(user.displayName, user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                 </DropdownMenuItem>
                <DropdownMenuItem disabled> {/* Placeholder for future settings */}
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                 <DropdownMenuLabel>Sign In Options</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/login">
                       <Mail className="mr-2 h-4 w-4" />
                       <span>Email/Password</span>
                    </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleSignIn(googleProvider, 'google')}>
                    {/* Inline SVG for Google icon */}
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l0.001-0.001l6.19,5.238C39.782,36.49,44,30.911,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    <span>Google</span>
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={handleSignIn(githubProvider, 'github')}>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
