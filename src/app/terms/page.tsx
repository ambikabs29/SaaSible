import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose dark:prose-invert">
          <h1>Terms of Service</h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using SaaSible (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on SaaSible's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on SaaSible's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by SaaSible at any time.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on SaaSible's website are provided on an 'as is' basis. SaaSible makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, SaaSible does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall SaaSible or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SaaSible's website, even if SaaSible or a SaaSible authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on SaaSible's website could include technical, typographical, or photographic errors. SaaSible does not warrant that any of the materials on its website are accurate, complete or current. SaaSible may make changes to the materials contained on its website at any time without notice. However SaaSible does not make any commitment to update the materials.
          </p>

          <h2>6. Links</h2>
          <p>
            SaaSible has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SaaSible of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>7. Modifications</h2>
          <p>
            SaaSible may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>

          <p>
            <em>(This is a template. Please consult with a legal professional to create comprehensive and legally sound Terms of Service for your specific application.)</em>
          </p>
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
