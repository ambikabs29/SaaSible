import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-center mb-8">Contact Us</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out via email.
          </p>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Basic form structure - no submission logic yet */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your message" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Write your message here..." rows={5} />
                </div>
                <Button type="submit" className="w-full sm:w-auto" disabled>Send Message (Coming Soon)</Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 text-center text-muted-foreground">
            <p>You can also reach us directly at:</p>
            <a href="mailto:support@saasible.com" className="text-primary hover:underline">support@saasible.com</a>
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
