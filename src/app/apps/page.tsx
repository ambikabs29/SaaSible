import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder data for applications
const applications = [
  {
    id: '1',
    name: 'Productivity Suite Pro',
    description: 'All-in-one suite for documents, spreadsheets, and presentations.',
    imageUrl: 'https://picsum.photos/400/225?random=10',
    tags: ['Productivity', 'Office'],
    platforms: ['web', 'exe', 'ios'],
    price: '$9.99/month',
    websiteUrl: '#', // Placeholder
    downloadUrls: { // Placeholder
      exe: '#',
      apk: null,
      ios: '#',
    }
  },
  {
    id: '2',
    name: 'Creative Cloud Lite',
    description: 'Essential tools for photo editing and graphic design.',
    imageUrl: 'https://picsum.photos/400/225?random=11',
    tags: ['Creative', 'Design', 'Photo'],
     platforms: ['web', 'exe'],
    price: '$12.99/month',
     websiteUrl: '#',
     downloadUrls: {
      exe: '#',
      apk: null,
      ios: null,
    }
  },
  {
    id: '3',
    name: 'DevHelper IDE',
    description: 'A lightweight code editor for web developers.',
    imageUrl: 'https://picsum.photos/400/225?random=12',
    tags: ['Development', 'Code', 'Web'],
     platforms: ['exe', 'apk'], // Example with different platforms
    price: 'Free',
     websiteUrl: '#',
     downloadUrls: {
      exe: '#',
      apk: '#',
      ios: null,
    }
  },
   {
    id: '4',
    name: 'Mobile Task Manager',
    description: 'Manage your tasks on the go.',
    imageUrl: 'https://picsum.photos/400/225?random=13',
    tags: ['Productivity', 'Mobile'],
     platforms: ['apk', 'ios'],
    price: '$1.99',
     websiteUrl: '#',
     downloadUrls: {
      exe: null,
      apk: '#',
      ios: '#',
    }
  },
   {
    id: '5',
    name: 'Web Analytics Dashboard',
    description: 'Track your website traffic and user behavior.',
    imageUrl: 'https://picsum.photos/400/225?random=14',
    tags: ['Analytics', 'Web', 'Marketing'],
     platforms: ['web'],
    price: '$29/month',
     websiteUrl: '#',
     downloadUrls: {
      exe: null,
      apk: null,
      ios: null,
    }
  },
];

export default function AppsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Explore Applications</h1>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {applications.map((app) => (
              <Card key={app.id} className="flex flex-col overflow-hidden card-hover">
                <CardHeader className="p-0">
                   <Image
                     src={app.imageUrl}
                     alt={app.name}
                     width={400}
                     height={225}
                     className="aspect-video object-cover"
                   />
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                   <CardTitle className="text-lg mb-1">{app.name}</CardTitle>
                  <CardDescription className="text-sm mb-3 flex-1">{app.description}</CardDescription>
                   <div className="flex flex-wrap gap-1 mb-3">
                     {app.tags.map(tag => (
                       <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
                     ))}
                   </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                     <span>{app.price}</span>
                      <div className="flex items-center gap-1">
                        {app.platforms.includes('web') && <ExternalLink className="w-4 h-4" title="Web App"/>}
                        {app.platforms.includes('exe') && <Download className="w-4 h-4" title="Windows Download"/>}
                        {app.platforms.includes('apk') && <Download className="w-4 h-4" title="Android Download"/>}
                        {app.platforms.includes('ios') && <Download className="w-4 h-4" title="iOS Download"/>}
                      </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <div className="flex justify-between w-full gap-2">
                    <Button size="sm" asChild>
                      {/* Link to a future detailed app page */}
                      <Link href={`/apps/${app.id}`}>View Details</Link>
                    </Button>
                     {/* Add Purchase/Download button logic here later */}
                    <Button size="sm" variant="secondary" disabled>
                      Get App
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
           {/* Placeholder for pagination if needed */}
          {/* <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div> */}
        </div>
      </main>
       {/* Footer */}
      <footer className="w-full py-6 md:py-8 border-t bg-secondary">
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
    </>
  );
}
