import { Metadata } from 'next'
import { SiteHeader } from '@/components/SiteHeader'
import { PageShell } from '@/components/PageShell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Dinner Decision Maker - how we collect, use, and protect your data.',
  alternates: {
    canonical: 'https://www.dinnerdecisionmaker.com/privacy',
  },
}

export default function PrivacyPage() {
  const lastUpdated = 'February 6, 2026'

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageShell title="Privacy Policy" description={`Last updated: ${lastUpdated}`}>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Dinner Decision Maker (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal data. This privacy policy explains how we collect,
              use, and safeguard your information when you use our website at www.dinnerdecisionmaker.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-foreground mb-2">Account Information</h3>
            <p className="text-muted-foreground mb-4">
              When you sign in with Google, we receive your name, email address, and profile picture
              from Google. We use this to create and manage your account.
            </p>

            <h3 className="text-lg font-medium text-foreground mb-2">Usage Data</h3>
            <p className="text-muted-foreground mb-4">
              We collect information about how you use our service, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Recipes you generate and save</li>
              <li>Restaurant searches you perform</li>
              <li>Wheel preferences you save</li>
              <li>Pages you visit and features you use</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2">Technical Data</h3>
            <p className="text-muted-foreground mb-4">
              We automatically collect certain technical information, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>IP address (for rate limiting and security)</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Pages visited and time spent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Provide and improve our recipe generation and restaurant search services</li>
              <li>Save your preferences and recipes to your account</li>
              <li>Prevent abuse through rate limiting</li>
              <li>Analyze usage patterns to improve our service</li>
              <li>Send important service updates (if you opt in)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>
                <strong>Google OAuth:</strong> For authentication. See{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google Places API:</strong> For restaurant search. Location data is sent to
                Google to find nearby restaurants.
              </li>
              <li>
                <strong>OpenAI:</strong> For recipe generation. Your ingredient inputs are processed
                by OpenAI&apos;s API. See{' '}
                <a
                  href="https://openai.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  OpenAI&apos;s Privacy Policy
                </a>
              </li>
              <li>
                <strong>Vercel:</strong> For hosting. See{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>
              </li>
              <li>
                <strong>Neon:</strong> For database hosting. See{' '}
                <a
                  href="https://neon.tech/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Neon&apos;s Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use essential cookies to maintain your session and remember your preferences
              (like dark/light mode). We do not use third-party tracking cookies for advertising.
            </p>
            <p className="text-muted-foreground mb-4">
              We may use analytics tools to understand how our service is used. This data is
              aggregated and does not personally identify you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your account data for as long as your account is active. You can delete
              your account at any time from your dashboard, which will permanently remove all
              your data including saved recipes and preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (via account deletion)</li>
              <li>Export your saved recipes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal data, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>HTTPS encryption for all data in transit</li>
              <li>Secure authentication through Google OAuth</li>
              <li>Rate limiting to prevent abuse</li>
              <li>Regular security updates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Our service is not intended for children under 13. We do not knowingly collect
              personal information from children under 13. If you are a parent and believe your
              child has provided us with personal data, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this privacy policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this privacy policy or our practices, please contact us
              at: lathan@mageeyemedia.com
            </p>
          </section>
        </div>
      </PageShell>
    </div>
  )
}
