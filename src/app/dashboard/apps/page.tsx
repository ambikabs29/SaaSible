"use client";

import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, UploadCloud } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";


// Placeholder data for user's applications
const userApplications = [
  { id: 'app-101', name: 'My Custom CRM', status: 'Published', lastUpdated: '2024-07-18', platforms: ['web'], type: 'url', url: 'https://mycrm.example.com' },
  { id: 'app-102', name: 'Internal Tool Suite', status: 'Draft', lastUpdated: '2024-07-20', platforms: ['exe'], type: 'zip', fileName: 'internal-tools-v1.zip' },
  { id: 'app-103', name: 'Mobile Companion App', status: 'Published', lastUpdated: '2024-06-05', platforms: ['apk', 'ios'], type: 'zip', fileName: 'companion-app.zip' },
];

export default function ManageAppsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [apps, setApps] = useState(userApplications); // State for managing apps
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    // Add logic here later to fetch user-specific apps if needed
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("File selected:", file.name);
        // TODO: Implement actual file upload logic (e.g., to Firebase Storage)
        // Close dialog after selecting (or on successful upload)
         // setIsUploadDialogOpen(false);
      }
    };


  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Applications</h1>
             <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
               <DialogTrigger asChild>
                 <Button>
                   <PlusCircle className="mr-2 h-4 w-4" /> Add New App
                 </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px]">
                 <DialogHeader>
                   <DialogTitle>Add New Application</DialogTitle>
                   <DialogDescription>
                     Provide details for your application. You can upload a ZIP file or reference a URL.
                   </DialogDescription>
                 </DialogHeader>
                 <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="appName" className="text-right">
                       App Name
                     </Label>
                     <Input id="appName" placeholder="My Awesome App" className="col-span-3" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="appDesc" className="text-right">
                       Description
                     </Label>
                     <Textarea id="appDesc" placeholder="A short description of your app" className="col-span-3" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Type</Label>
                      <div className="col-span-3 flex items-center gap-4">
                         {/* Add Radio Group for URL vs ZIP */}
                         <Label>URL (Coming Soon)</Label>
                      </div>
                   </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="appFile" className="text-right">
                       App File (ZIP)
                     </Label>
                      <div className="col-span-3">
                        <Input id="appFile" type="file" accept=".zip" onChange={handleFileUpload} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                        <p className="text-xs text-muted-foreground mt-1">Upload the application package.</p>
                      </div>
                   </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">Platforms</Label>
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                              <Checkbox id="platform-web" />
                              <Label htmlFor="platform-web">Web</Label>
                          </div>
                           <div className="flex items-center space-x-2">
                              <Checkbox id="platform-exe" />
                              <Label htmlFor="platform-exe">Windows (.exe)</Label>
                          </div>
                           <div className="flex items-center space-x-2">
                              <Checkbox id="platform-apk" />
                              <Label htmlFor="platform-apk">Android (.apk)</Label>
                          </div>
                           <div className="flex items-center space-x-2">
                              <Checkbox id="platform-ios" />
                              <Label htmlFor="platform-ios">iOS</Label>
                          </div>
                      </div>
                   </div>

                 </div>
                 <DialogFooter>
                   <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                   <Button type="submit" disabled>Save Application (Coming Soon)</Button>
                 </DialogFooter>
               </DialogContent>
             </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Platforms</TableHead>
                     <TableHead>Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        You haven't added any applications yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {apps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>
                         <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                           {app.status}
                         </span>
                       </TableCell>
                      <TableCell>{app.platforms.join(', ').toUpperCase()}</TableCell>
                       <TableCell className="uppercase">{app.type}</TableCell>
                      <TableCell>{app.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="mr-1" disabled>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled>
                          <Trash2 className="h-4 w-4" />
                           <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
