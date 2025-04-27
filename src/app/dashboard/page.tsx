"use client";

import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Users, Settings, Download } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading state or null while checking auth/redirecting
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* You can replace this with a more sophisticated loading spinner */}
        <p>Loading...</p>
      </div>
    );
  }

  // Render dashboard content if user is authenticated
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <p className="text-lg text-muted-foreground mb-8">Welcome, {user.displayName || user.email}!</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder Cards for Dashboard Sections */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-primary" />
                  Manage Apps
                </CardTitle>
                <CardDescription>Upload, view, and manage applications.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboard/apps">Go to Apps</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Manage Users
                </CardTitle>
                <CardDescription>Administer tenants, customers, and roles.</CardDescription>
              </CardHeader>
              <CardContent>
                 {/* Add check for admin role here later */}
                <Button asChild disabled>
                  <Link href="/dashboard/users">Go to Users</Link>
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">(Admin Only - Coming Soon)</p>
              </CardContent>
            </Card>

             <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  My Downloads
                </CardTitle>
                <CardDescription>Access your purchased or downloaded apps.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/apps">Browse Apps</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your profile and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild disabled>
                  <Link href="/dashboard/settings">Go to Settings</Link>
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">(Coming Soon)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
       {/* Footer */}
      <footer className="w-full py-6 md:py-8 border-t bg-secondary mt-auto">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SaaSible. All rights reserved.</p>
           <nav className="flex gap-4 sm:gap-6">
             <Link href="/terms" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
               Terms of Service
             </Link>
             <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
               Privacy Policy
             </Link>
           </nav>
        </div>
      </footer>
    </div>
  );
}
