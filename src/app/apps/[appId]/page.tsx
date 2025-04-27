import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, CheckCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder function to fetch app details by ID
// In a real app, this would fetch data from a database or API
async function getAppDetails(appId: string) {
   // Simulating an API call delay
   await new Promise(resolve => setTimeout(resolve, 50));

   // Placeholder data - find the app from the dummy list or return null
   const applications = [
     { id: '1', name: 'Productivity Suite Pro', description: 'All-in-one suite for documents, spreadsheets, and presentations. Enhance your workflow with powerful tools and seamless collaboration features.', longDescription: 'Productivity Suite Pro offers a comprehensive set of tools designed for modern professionals. Create stunning documents, analyze data with advanced spreadsheets, and deliver impactful presentations. Features real-time collaboration, cloud storage integration, and cross-platform compatibility.', imageUrl: 'https://picsum.photos/800/450?random=10', tags: ['Productivity', 'Office', 'Collaboration', 'Business'], platforms: ['web', 'exe', 'ios'], price: '$9.99/month', websiteUrl: '#', downloadUrls: { exe: '#', apk: null, ios: '#' }, version: '2.1.0', lastUpdated: '2024-07-15', developer: 'Productivity Inc.' },
     { id: '2', name: 'Creative Cloud Lite', description: 'Essential tools for photo editing and graphic design.', longDescription: 'Unleash your creativity with Creative Cloud Lite. Edit photos with professional-grade tools, design beautiful graphics, and manage your assets efficiently. Perfect for hobbyists and aspiring designers.', imageUrl: 'https://picsum.photos/800/450?random=11', tags: ['Creative', 'Design', 'Photo', 'Graphics'], platforms: ['web', 'exe'], price: '$12.99/month', websiteUrl: '#', downloadUrls: { exe: '#', apk: null, ios: null }, version: '1.5.2', lastUpdated: '2024-06-28', developer: 'Creative Solutions' },
     { id: '3', name: 'DevHelper IDE', description: 'A lightweight code editor for web developers.', longDescription: 'DevHelper IDE provides a fast and efficient coding environment optimized for web development. Features syntax highlighting, code completion, integrated terminal, and Git support. Boost your development speed.', imageUrl: 'https://picsum.photos/800/450?random=12', tags: ['Development', 'Code', 'Web', 'IDE', 'Editor'], platforms: ['exe', 'apk'], price: 'Free', websiteUrl: '#', downloadUrls: { exe: '#', apk: '#', ios: null }, version: '3.0.1', lastUpdated: '2024-07-20', developer: 'CodeCrafters' },
     { id: '4', name: 'Mobile Task Manager', description: 'Manage your tasks on the go.', longDescription: 'Stay organized wherever you are with Mobile Task Manager. Create tasks, set reminders, prioritize items, and track progress effortlessly from your mobile device. Syncs across devices.', imageUrl: 'https://picsum.photos/800/450?random=13', tags: ['Productivity', 'Mobile', 'Tasks', 'Organization'], platforms: ['apk', 'ios'], price: '$1.99', websiteUrl: '#', downloadUrls: { exe: null, apk: '#', ios: '#' }, version: '1.2.5', lastUpdated: '2024-05-10', developer: 'Appify Mobile' },
     { id: '5', name: 'Web Analytics Dashboard', description: 'Track your website traffic and user behavior.', longDescription: 'Gain valuable insights into your website\'s performance with our Web Analytics Dashboard. Monitor key metrics, understand user journeys, and optimize your online presence. Features customizable reports and real-time data.', imageUrl: 'https://picsum.photos/800/450?random=14', tags: ['Analytics', 'Web', 'Marketing', 'Data', 'SEO'], platforms: ['web'], price: '$29/month', websiteUrl: '#', downloadUrls: { exe: null, apk: null, ios: null }, version: '4.3.0', lastUpdated: '2024-07-22', developer: 'Data Insights Co.' },
   ];
   return applications.find(app => app.id === appId) || null;
 }


export default async function AppDetailsPage({ params }: { params: { appId: string } }) {
  const app = await getAppDetails(params.appId);

  if (!app) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Application Not Found</h1>
            <p className="text-muted-foreground mb-8">The application you are looking for does not exist or could not be loaded.</p>
            <Button asChild>
              <Link href="/apps">Back to Apps</Link>
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Image and Basic Info */}
            <div className="md:col-span-1 space-y-6">
              <Card className="overflow-hidden shadow-lg">
                <Image
                  src={app.imageUrl}
                  alt={app.name}
                  width={800}
                  height={450}
                  className="aspect-video object-cover w-full"
                />
                <CardContent className="p-4">
                  <h1 className="text-2xl font-bold mb-2">{app.name}</h1>
                  <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                   <div className="space-y-1 text-sm">
                     <p><span className="font-medium">Price:</span> {app.price}</p>
                     <p><span className="font-medium">Version:</span> {app.version}</p>
                     <p><span className="font-medium">Last Updated:</span> {app.lastUpdated}</p>
                     <p><span className="font-medium">Developer:</span> {app.developer}</p>
                   </div>
                </CardContent>
              </Card>
               <Card>
                 <CardHeader>
                   <CardTitle className="text-lg">Available Platforms</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                    {app.platforms.includes('web') && (
                       <div className="flex items-center gap-2">
                         <ExternalLink className="w-5 h-5 text-primary"/>
                         <span>Web Application</span>
                         <Button size="sm" variant="outline" className="ml-auto" asChild>
                            <Link href={app.websiteUrl} target="_blank">Visit Website</Link>
                         </Button>
                       </div>
                    )}
                    {app.platforms.includes('exe') && app.downloadUrls.exe && (
                       <div className="flex items-center gap-2">
                         <Download className="w-5 h-5 text-primary"/>
                         <span>Windows (.exe)</span>
                          <Button size="sm" variant="outline" className="ml-auto" asChild disabled={app.downloadUrls.exe === '#'}>
                            <Link href={app.downloadUrls.exe}>Download</Link>
                          </Button>
                       </div>
                    )}
                     {app.platforms.includes('apk') && app.downloadUrls.apk && (
                       <div className="flex items-center gap-2">
                         <Download className="w-5 h-5 text-primary"/>
                         <span>Android (.apk)</span>
                         <Button size="sm" variant="outline" className="ml-auto" asChild disabled={app.downloadUrls.apk === '#'}>
                           <Link href={app.downloadUrls.apk}>Download</Link>
                         </Button>
                       </div>
                    )}
                    {app.platforms.includes('ios') && app.downloadUrls.ios && (
                       <div className="flex items-center gap-2">
                         <Download className="w-5 h-5 text-primary"/>
                         <span>iOS</span>
                          <Button size="sm" variant="outline" className="ml-auto" asChild disabled={app.downloadUrls.ios === '#'}>
                           {/* iOS apps usually link to App Store */}
                           <Link href={app.downloadUrls.ios} target="_blank">View on App Store</Link>
                         </Button>
                       </div>
                    )}
                 </CardContent>
               </Card>
            </div>

            {/* Right Column - Details and Actions */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  {/* Using placeholder long description */}
                  <p>{app.longDescription || app.description}</p>
                  {/* Add more detailed description paragraphs here */}
                </CardContent>
              </Card>

              {/* Placeholder for features, reviews, etc. */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Feature placeholder 1</li>
                    <li>Feature placeholder 2</li>
                    <li>Another great feature</li>
                    <li>Seamless integration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reviews coming soon.</p>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="text-center md:text-left">
                 <Button size="lg" className="w-full md:w-auto" disabled>
                     {app.price === 'Free' ? 'Get Free App' : `Purchase for ${app.price}`}
                 </Button>
                  <p className="text-xs text-muted-foreground mt-2">(Purchase/Download functionality coming soon)</p>
              </div>
            </div>
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
    </>
  );
}

// Optional: Generate static paths if you know all app IDs beforehand
// export async function generateStaticParams() {
//   // Fetch all app IDs
//   // const apps = await fetchAllAppIds();
//   const apps = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]; // Placeholder
//   return apps.map((app) => ({
//     appId: app.id,
//   }));
// }
