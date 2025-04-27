import { SiteHeader } from "@/components/site-header";
import Image from 'next/image';
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About SaaSible</h1>
              <p className="text-lg text-muted-foreground">
                SaaSible is your central hub for discovering, purchasing, and managing Software-as-a-Service (SaaS) applications. We strive to simplify the software ecosystem for both vendors and users.
              </p>
              <p className="text-muted-foreground">
                Our mission is to provide a seamless, secure, and efficient marketplace. For vendors, SaaSible offers a platform to showcase and distribute their applications. For users, it's a curated space to find the tools they need, manage subscriptions, and access downloads easily.
              </p>
              <p className="text-muted-foreground">
                We believe in the power of great software and aim to make it accessible to everyone. SaaSible leverages modern technology to ensure a reliable and user-friendly experience, featuring secure authentication, streamlined management tools for administrators, and easy access for end-users across multiple platforms (Web, Windows, Android, iOS).
              </p>
              <h2 className="text-2xl font-semibold pt-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To become the leading marketplace for SaaS applications, fostering innovation and simplifying software management for businesses and individuals worldwide.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://picsum.photos/600/400?random=3" // Placeholder image
                alt="Team working on SaaSible"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
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
