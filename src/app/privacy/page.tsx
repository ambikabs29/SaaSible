import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>

          <p>
            Your privacy is important to us. It is SaaSible's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          <p>
            Information we collect may include:
          </p>
          <ul>
            <li>Name</li>
            <li>Email Address</li>
            <li>Authentication provider details (e.g., Google ID, GitHub ID, if used for login)</li>
            <li>Usage data (how you interact with the Service)</li>
            <li>Uploaded application data (for administrators)</li>
          </ul>


          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Process your transactions</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2>3. Log Files</h2>
           <p>SaaSible follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

          <h2>4. Cookies and Web Beacons</h2>
           <p>Like any other website, SaaSible uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>


          <h2>5. Security</h2>
          <p>
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>

          <h2>6. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

           <h2>7. Children's Privacy</h2>
           <p>Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@saasible.com">privacy@saasible.com</a>.
          </p>

           <p>
            <em>(This is a template. Please consult with a legal professional to create a comprehensive and legally sound Privacy Policy for your specific application and data handling practices.)</em>
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
