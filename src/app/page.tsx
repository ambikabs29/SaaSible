import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, UploadCloud, Users, Download } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Banner Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/80 to-primary">
          {/* Placeholder for potential sliding animation or video background */}
           <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Overlay */}
           {/* Example static image background */}
           {/* <Image
             src="https://picsum.photos/1600/900?random=1" // Placeholder banner image
             alt="Banner Background"
             layout="fill"
             objectFit="cover"
             quality={80}
             className="absolute inset-0 z-0 opacity-50"
           /> */}
          <div className="container relative z-10 text-center text-primary-foreground space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
              Welcome to SaaSible
            </h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl text-primary-foreground/90">
              Discover, purchase, and manage your favorite SaaS applications all in one place. Simplify your software workflow.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/apps">
                  Explore Apps <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                 <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose SaaSible?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SaaSible offers a seamless experience for both users and administrators, providing powerful tools for managing and accessing software.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <CheckCircle className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">Secure Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  Login easily and securely using Email/Password, Google, or GitHub. Your access is protected.
                </CardContent>
              </Card>
              <Card className="card-hover">
                 <CardHeader className="flex flex-row items-center gap-4 pb-2">
                   <Users className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">User & Tenant Management</CardTitle>
                 </CardHeader>
                 <CardContent>
                   Admins can effortlessly manage tenants, customer roles, and permissions for granular control.
                 </CardContent>
              </Card>
               <Card className="card-hover">
                 <CardHeader className="flex flex-row items-center gap-4 pb-2">
                   <UploadCloud className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">Easy App Upload</CardTitle>
                 </CardHeader>
                 <CardContent>
                   Admins can add web applications via zip upload or URL reference, expanding the marketplace offerings.
                 </CardContent>
              </Card>
               <Card className="card-hover">
                 <CardHeader className="flex flex-row items-center gap-4 pb-2">
                   <Download className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">Multi-Platform Downloads</CardTitle>
                 </CardHeader>
                 <CardContent>
                   Download native applications directly for Windows (.exe), Android (.apk), and iOS.
                 </CardContent>
              </Card>
               <Card className="card-hover">
                 <CardHeader className="flex flex-row items-center gap-4 pb-2">
                   {/* Placeholder Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  <CardTitle className="text-xl">Clean Interface</CardTitle>
                 </CardHeader>
                 <CardContent>
                   Enjoy a modern, intuitive, and card-based layout for easy navigation and discovery.
                 </CardContent>
              </Card>
               <Card className="card-hover">
                 <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {/* Placeholder Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <CardTitle className="text-xl">Smooth Experience</CardTitle>
                 </CardHeader>
                 <CardContent>
                   Subtle animations and transitions enhance usability without being distracting.
                 </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About SaaSible</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                SaaSible was born from the need for a centralized platform to manage and distribute Software-as-a-Service applications efficiently. We aim to bridge the gap between software vendors and end-users, providing a secure and user-friendly marketplace.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform empowers administrators with robust management tools while offering users a curated selection of high-quality applications.
              </p>
            </div>
            <div className="flex justify-center">
              {/* You can replace this with a relevant image or illustration */}
              <Image
                src="https://picsum.photos/550/310?random=2" // Placeholder about image
                alt="About SaaSible"
                width={550}
                height={310}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

         {/* Video Section Placeholder */}
         <section id="video" className="w-full py-16 md:py-24 lg:py-32 bg-background">
           <div className="container px-4 md:px-6 text-center">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">See SaaSible in Action</h2>
             <div className="aspect-video max-w-4xl mx-auto bg-muted rounded-lg flex items-center justify-center">
               {/* Replace with an actual video embed (e.g., YouTube, Vimeo) */}
               <p className="text-muted-foreground">Video Placeholder</p>
             </div>
           </div>
         </section>

        {/* Call to Action Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Simplify Your SaaS Management?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join SaaSible today and experience a better way to discover, manage, and deploy software.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2">
               <Button type="submit" size="lg" asChild>
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
               <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
               </Button>
            </div>
          </div>
        </section>
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
